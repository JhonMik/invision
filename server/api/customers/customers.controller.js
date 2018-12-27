const Customer = require('./customer.model.js');
const Braavos = require('../../components/braavos');

const controller = {
  getCustomers: function(req, res) {
    // TODO: get all payors(customers) if request is from admin
    return Braavos.getInvoices(req.body.uuid)
      .then(invoices => {
        res.json(
          invoices.reduce(function (output, invoice) {
            let id = invoice.accounting_customer_id;
            let oIndex = output.findIndex(i => i.id == id);
            if (oIndex === -1) {
              output.push({
                id: id,
                contactName: invoice.customer,
                companyName: invoice.customer,
                contactEmail: invoice.email_address_opt,
                unpaidInvoices: 1,
                unpaidAmount: Number(invoice.balance)});
            } else {
              output[oIndex].unpaidInvoices += 1;
              output[oIndex].unpaidAmount += Number(invoice.balance);
            }
            return output;
          }, [])
        );
      })
  },
  getCustomersInLocal: async function(req, res) {
    // TODO: admin permission check

    Customer.find({}, function(err, customers) {
      if (err) {
        console.log(err);
        res.json([]);
      } else {
        res.json(customers);
      }
    });
  },
  getCustomerInLocalById: async function(req, res) {
    // TODO: admin permission check

    Customer.findOne({id: req.params.id}, function(err, customer) {
      if (err) {
        console.log(err);
        res.json([]);
      } else {
        res.json(customer);
      }
    });
  },
};

module.exports = controller;