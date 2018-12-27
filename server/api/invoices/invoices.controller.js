'use strict'

const Invoice = require('./invoice.model.js');
const Customer = require('../customers/customer.model.js');
const Braavos = require('../../components/braavos');
const Jekyll = require('../../components/jekyll');
const {CustomError} = require('../../error_handling');
const encrypt = require('../../util/crypto.js').encrypt;
const decrypt = require('../../util/crypto.js').decrypt;
const moment = require('moment');
const segment = require('../../components/segment');
const slack = require('slack-notify')(process.env.SLACK_NOTIFICATION_URI);

function flattenedInvoices(invoices) {
  return invoices.map(invoice => {
    invoice = Object.assign({}, invoice._doc, invoice.importedData);
    delete invoice.importedData;
    return invoice;
  });
}

async function extractAndSaveCustomer (invoiceDoc) {
  const importedData = invoiceDoc.importedData;
  const customerEmail = importedData.email_address_opt;
  const customerId = importedData.accounting_customer_id;
  let invoiceCustomer = await Customer.findOne({ id: customerId });
  if (!invoiceCustomer) {
    // let this one run asynchronously for better UX
    Braavos.getCustomers(invoiceDoc.clientUuid).then(async customerList => {
      if (customerList.customers) {
        const contact = customerList.customers.filter(customer => customer.id === importedData.accounting_customer_id);
        invoiceCustomer = new Customer({
          id: importedData.accounting_customer_id,
          name: importedData.customer,
          email: customerEmail,
          contact_name: (contact.length ? contact[0].contact_name : null)
        });
        invoiceCustomer.save();
      }
    }).catch(err => console.error(err));
  }
};

async function logInvoiceEvent (invoiceEvent, invoiceDoc, req, properties) {
  invoiceDoc.events.push({ descriptor: invoiceEvent });
  invoiceDoc.status = invoiceEvent;
  let user = await Jekyll.getUser(invoiceDoc.clientUuid);
  properties = {
    ...properties,
    client: {
      company_name: (user.company_name || user.name),
      contact_name: user.first_name,
      contact_fullname: user.name,
      phone: user.phone,
      business_name: user.company_name
    },
    payor: { company_name: invoiceDoc.importedData.customer },
    invoice: {  // most of these properties are used in multiple events, so generate them all for simplicity
      days_overdue: moment().diff(moment(invoiceDoc.importedData.due_date), 'days'),
      due_date: invoiceDoc.importedData.due_date,
      face_value: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })
        .format(Number(invoiceDoc.importedData.amount) * (1 - process.env.STANDARD_TRANSACTION_FEE)),
      invoice_date: invoiceDoc.importedData.submitted_date,
      number: invoiceDoc.importedData.number,
    }
  };
  switch (invoiceEvent) {
    case 'invoice_verification_requested':
    case 'invoice_verification_reminded':
    case 'invoice_payment_overdue':
      properties.invoice.payor_message = (req.body.message || '').replace(/\r?\n/g, '<br>').replace('review here', '<a href="' + properties.payor_url + '">review here</a>');
      segment.identifyUserAndSendEmail(user.uuid, invoiceDoc.importedData.email_address_opt, invoiceEvent, properties);
      break;
    case 'invoice_verification_accepted':
    case 'invoice_verification_disputed':
    case 'invoice_verification_approved':
      segment.identifyUserAndSendEmail(user.uuid, user.email, invoiceEvent, properties);
      break;
    case 'invoice_payor_informed':
      let invoiceCustomer = await Customer.findOne({ id: invoiceDoc.importedData.accounting_customer_id });
      properties.payor.salutation = (invoiceCustomer && invoiceCustomer.contact_name) ?
          `Dear ${invoiceCustomer.contact_name}`
          : 'To Whom It May Concern';
      segment.identifyUserAndSendEmail(user.uuid, user.email, invoiceEvent, properties);
      break;
    case 'invoice_creation_completed':
    case 'invoice_verification_delayed':
    case 'invoice_verification_rejected':
      segment.trackEvent(invoiceDoc.clientUuid, invoiceEvent, { invoiceId: invoiceDoc.id, ...properties });
      break;
  }
  await invoiceDoc.save();
};

function mergedInvoices(dbInvoices, importedInvoices) {
  let dbInvoiceIdList = dbInvoices.reduce((list, invoice) => list.concat(invoice.id), []);
  for (let i = importedInvoices.length - 1; i >= 0; --i) {
    if (dbInvoiceIdList.includes(importedInvoices[i].id)) { // we already have this one
      importedInvoices.splice(i, 1);
    } else {                                                // here's one we haven't seen before
    importedInvoices[i].status = 'invoice_creation_pending';
    if (importedInvoices[i].state === 'outstanding') {
      importedInvoices[i].computedState = moment().isAfter(importedInvoices[i].due_date, 'day') ? 'past_due' : 'fundable';
    }
  }
}
return importedInvoices.concat(flattenedInvoices(dbInvoices));
}

module.exports = {
  getMergedInvoices: async function(uuid) {
    let dbInvoices = await Invoice.find({clientUuid: uuid});
    let importedInvoices = await Braavos.getInvoices(uuid);
    return mergedInvoices(dbInvoices, importedInvoices);
  },
  
  getInvoices: async function (req, res) {
    let invoices = await module.exports.getMergedInvoices(req.body.uuid);
    if (req.query.state) {
      invoices = invoices.filter(invoice => invoice.computedState == req.query.state);
    }
    res.json(invoices);
  },
  
  getInvoicesInLocalByClientUuid: async function(req, res) {
    // TODO: check for admin permission
    
    Invoice.find({clientUuid: req.body.clientUuid}, function (err, invoices) {
      if (req.query.status) {
        invoices = invoices.filter(invoice => invoice.status == req.query.status);
      }
      res.json(invoices);
    })
  },
  getInvoicesInLocalByCustomerEmail: async function(req, res) {
    // TODO: check for admin permission
    Invoice.find({}, function (err, invoices) {
      if (req.query.status) {
        invoices = invoices.filter(invoice => invoice.status == req.query.status);
      }
      let targetInvoices = [];
      
      for (let i = invoices.length - 1; i >= 0; i--) {
        if ((invoices[i].importedData.email_address_opt || '').toLowerCase() == req.body.email.toLowerCase()) {
          targetInvoices.push(invoices[i]);
        }
      }
      res.json(targetInvoices);
    })
  },
  
  getInvoice: async function (req, res) {
    let invoices = await Braavos.getInvoices(req.body.uuid);
    let [importedInvoice] = invoices.filter(invoice => invoice.id == req.params.id);
    let localInvoice = await Invoice.findOne({ id: req.params.id });
    if (!localInvoice) {
      localInvoice = new Invoice({
        id: importedInvoice.id,
        clientUuid: importedInvoice.owner_uuid,
        importedData: importedInvoice,
        status: 'invoice_creation_pending',
        computedState: moment().isAfter(importedInvoice.due_date, 'day') ? 'past_due' : 'fundable'
      });
      logInvoiceEvent('invoice_creation_completed', localInvoice, req, null);
    } else if (!importedInvoice) {
      if (localInvoice.computedState != 'archived') {
        logInvoiceEvent('invoice_source_removed', localInvoice, req, null);
      }
    } else {
      localInvoice.importedData = importedInvoice;
    }
    extractAndSaveCustomer(localInvoice);
    res.json(flattenedInvoices([localInvoice]));
  },
  getInvoiceByToken: async function(req, res) {
    let token = req.params.token;
    if (!token) {
      token = '';
    }
    
    let id = decrypt(token);
    Invoice.find({id: id}, async function (err, oneInvoice) {
      res.json(flattenedInvoices(oneInvoice));
    });
  },
  
  verificationSetStatus: async function (req, res) {
    let invoice = await Invoice.findOne({ id: req.params.id });
    if (!invoice) {
      throw new CustomError('APIError', `Unknown invoice: ${req.params.id}`);
    }
    let token = encrypt(invoice.id.toString());
    let eventProperties = { verification: req.params.status };
    switch (req.params.status) {

      // client actions
      case 'requested':
        if (!invoice.importedData.email_address_opt) {
          throw new CustomError('APIError', 'Missing payor email in invoice');
        }
        eventProperties.payor_url = `${req.protocol}://${req.get('host')}/payor/invoice/${token}`;
        break;
        
      // payor actions
      case 'disputed':
        eventProperties.payor_rejection_message = (req.body.message || '(no message provided)');
      // FALL-THROUGH
      case 'accepted':
        const email = req.body.vero_id.split('/')[1];
        slack.send({ username: null, icon_emoji: null,
          text: `Invoice ${req.params.status} by customer ${invoice.importedData.customer} at email ${email}, IP address ${req.body.payorIpaddr}.  `
                + `Email history at https://app.getvero.com/customers?search=${req.body.vero_id}`
        });
        break;
      case 'delayed':
        break;
        
      // admin actions
      case 'approved':
        break;
      case 'rejected':
        break;
      case 'reminded':
        break;

      default:
        throw new CustomError('APIError', `Invalid verification status: ${req.params.status}`);
    }
    logInvoiceEvent('invoice_verification_' + req.params.status, invoice, req, eventProperties);
    res.json({ message: 'Verification status set.', invoice_token: token });
  },

  paymentOverdue: async function (req, res) {
    Invoice.findOne({ id: req.params.id }, function (err, invoice) {
      if (invoice.length === 0) {
        throw new CustomError('APIError', `Unknown invoice: ${req.params.id}`);
      }

      logInvoiceEvent('invoice_payment_overdue', invoice, req, null);
      let token = encrypt(invoice.id.toString());
      res.json({ message: 'Payment overdue email triggered.', invoice_token: token });
    });
  },

  informPayor: async function (req, res) {
    let invoice = await Invoice.findOne({ id: req.params.id });
    if (!invoice) {
      throw new CustomError('APIError', `Unknown invoice: ${req.params.id}`);
    }

    logInvoiceEvent('invoice_payor_informed', invoice, req, null);
    let token = encrypt(invoice.id.toString());
    res.json({ message: 'AR software change email triggered.', invoice_token: token });
  },
};
