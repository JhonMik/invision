const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const InvoiceEventSchema = new Schema({
  descriptor: String,
  timestamp: {
    type: Date,
    default: Date.now
  },
  properties: Schema.Types.Mixed
});

const InvoiceSchema = new Schema({
  id: Number,
  clientUuid: String,
  status: String,
  computedState: String,
  importedData: Schema.Types.Mixed,
  events: [InvoiceEventSchema],
  updatedAt: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

function computeStates (result) {
  if (!result) {
    return;
  }
  if (!Array.isArray(result)) {
    result = [ result ];
  }
  result.forEach((invoice) => {
    if (invoice.importedData.due_date < Date.now()) {
      invoice.computedState = 'past_due';
    } else if (invoice.events.findIndex(invoiceEvent => (invoiceEvent.descriptor === 'invoice_source_removed')) !== -1) {
      invoice.computedState = 'archived';
    } else if (invoice.events.findIndex(invoiceEvent => (invoiceEvent.descriptor === 'invoice_verification_disputed' || invoiceEvent.descriptor === 'invoice_verification_rejected')) !== -1) {
      invoice.computedState = 'rejected';
    } else if (invoice.events.findIndex(invoiceEvent => (invoiceEvent.descriptor === 'invoice_verification_approved')) !== -1) {
      invoice.computedState = 'approved';
    } else if (invoice.events.findIndex(invoiceEvent => (invoiceEvent.descriptor === 'invoice_verification_accepted')) !== -1) {
      invoice.computedState = 'processing';
    } else if (invoice.events.findIndex(invoiceEvent => (invoiceEvent.descriptor === 'invoice_verification_requested')) !== -1) {
      invoice.computedState = 'sent_to_payor';
    } else {
      invoice.computedState = 'fundable';
    }
  });
}

InvoiceSchema.post('find', computeStates);
InvoiceSchema.post('findOne', computeStates);

InvoiceSchema.pre('save', function (next) {
  this.updatedAt = Date.now
  next();
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
