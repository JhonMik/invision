const moment = require('moment');
const currency = require('../../util/currency');
const Jekyll = require('../../components/jekyll');
const Segment = require('../../components/segment');
const Invoices = require('../invoices/invoices.controller');
const {CustomError} = require('../../error_handling');
const invoicesToIgnore = ['paid', 'ignored', 'deleted'];

const controller = {
  getInvoiceSummary: async function(req, res) {
    let summary = {
      unpaidInvoicesCount: 0, unpaidInvoicesTotal: 0,
      averageDaysPastDue: 0,
        overdue0130Count: 0, overdue0130Total: 0,
        overdue3160Count: 0, overdue3160Total: 0,
        overdue6190Count: 0, overdue6190Total: 0,
        overdue90PlusCount: 0, overdue90PlusTotal: 0,
      fundedInvoicesCount: 0, fundedInvoicesTotal: 0
    };
    let invoices = await Invoices.getMergedInvoices(req.body.uuid);
    let daysPastDue = 0;
    let pastDueCount = 0;
    summary = invoices.reduce(function (output, invoice) {

      output.unpaidInvoicesCount += (invoice.computedState != 'paid' ? 1 : 0);
      output.unpaidInvoicesTotal = (invoice.computedState != 'paid'
        ? currency(output.unpaidInvoicesTotal).add(invoice.balance)
        : output.unpaidInvoicesTotal);

      daysPastDue = moment().diff(moment(invoice.due_date), 'days');
      if (daysPastDue > 0) {
        pastDueCount += 1;
        output.averageDaysPastDue += daysPastDue;
      }
      if (daysPastDue >= 90) {
        output.overdue90PlusCount += 1;
        output.overdue90PlusTotal = currency(output.overdue90PlusTotal).add(invoice.balance);
      } else if (daysPastDue > 60) {
        output.overdue6190Count += 1;
        output.overdue6190Total = currency(output.overdue6190Total).add(invoice.balance);
      } else if (daysPastDue > 30) {
        output.overdue3160Count += 1;
        output.overdue3160Total = currency(output.overdue3160Total).add(invoice.balance);
      } else if (daysPastDue > 0) {
        output.overdue0130Count += 1;
        output.overdue0130Total = currency(output.overdue0130Total).add(invoice.balance);
      }

      output.fundedInvoicesCount += (invoice.computedState == 'funded' ? 1 : 0);
      output.fundedInvoicesTotal = (invoice.computedState == 'funded'
        ? currency(output.fundedInvoicesTotal).add(invoice.balance)
        : output.fundedInvoicesTotal);
      
      return output;
    }, summary);
    summary.averageDaysPastDue = Math.round(summary.averageDaysPastDue / pastDueCount);
    res.json(summary);
  },

  getRecentlyFunded: async function(req, res) {
    const days = req.query.days || 7;

    let invoices = await Invoices.getMergedInvoices(req.body.uuid);
    if (isNaN(days)) {
      throw new CustomError('APIError', 'days parameter must be a number');
    }
    res.json(
      invoices

// TODO: implement last_payment_date or similar for NZFE (not using Braavos date)

      .filter(invoice => invoice.computedState == 'funded' && moment().diff(moment(invoice.last_payment_date), 'days') <= days)
      .reduce(function (output, invoice) {
        output.push({
          customer: invoice.customer,
          invoice: invoice.number,
          dateFunded: invoice.last_payment_date,
          fundedAmount: invoice.amount,
          fundingFees: 0});
        return output;
      }, [])
    );
  },

  getRecentlyPaid: async function(req, res) {
    const days = req.query.days || 7;

    if (isNaN(days)) {
      throw new CustomError('APIError', 'days parameter must be a number');
    }
    let invoices = await Invoices.getMergedInvoices(req.body.uuid);
    res.json(
      invoices

// TODO: implement last_payment_date or similar for NZFE (not using Braavos date)

      .filter(invoice => invoice.computedState == 'paid' && moment().diff(moment(invoice.last_payment_date), 'days') <= days)
      .reduce(function (output, invoice) {
        output.push({
          customer: invoice.customer,
          invoice: invoice.number,
          datePaid: invoice.last_payment_date,
          paidAmount: invoice.amount,
          daysToPay: moment(invoice.last_payment_date).diff(moment(invoice.submitted_date), 'days')});
        return output;
      }, [])
    );
  },
  triggerEmail: async function(req, res) {
    Jekyll.getUser(req.params.uuid).then(user => {
      let properties = {};
      switch (req.params.invoiceEvent) {
        case 'client_banking_connected':
        case 'client_banking_unconnected':
        case 'client_invoicing_reminded':
          properties = {client: {first_name: user.name.split(" ")[0]}};
          break;
        default:
        res.json({message: `Invalid event: ${req.params.invoiceEvent}`});
      }
      Segment.identifyUserAndSendEmail (req.params.uuid, user.email, req.params.invoiceEvent, properties);
      res.json({message: `${req.params.invoiceEvent} email triggered.`});
    });
  }
};

module.exports = controller;