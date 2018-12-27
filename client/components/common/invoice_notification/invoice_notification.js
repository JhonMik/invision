import Vue from 'vue'
import ip from 'ip'
import pdf from 'vue-pdf'
import { EventBus } from '@/event-bus.js'

export default {
  components: {
    pdf
  },

  data() {
    return {
      dialogViewInvoice: false,
      dialogPreviewInvoice: false,
      dialogViewFundedInvoice: false,
      dialogSendInvoiceForVerification: false,
      dialogVerificationMessage: false,
      dialogConfirm: false,
      dialogViewInvoiceForRemind: false,
      dialogReminderMessage: false,
      dialogPayorConfirmInvoice: false,
      dialogPayorRejectInvoice: false,
      dialogPayorConfirmed: false,

      invoice: {
        id: "",
        number: "",
        customer: "",
        state: "",
        amount: "",
        due_date: "",
        balance: "",
        currency: "",
        events: [],
      },
      clientName: "",
      verificationMessageData: {
        message: "",
      },
      payorRejectMessageData: {
        message: "",
      },
    }
  },

  privates: {

  },

  methods: {
    openViewInvoice() {
      this.dialogViewInvoice = true;
      this.dialogPreviewInvoice = false;
      this.dialogViewFundedInvoice = false;
      this.dialogSendInvoiceForVerification = false;
      this.dialogVerificationMessage = false;
      this.dialogConfirm = false;
      this.dialogViewInvoiceForRemind = false;
      this.dialogReminderMessage = false;
      this.dialogPayorConfirmInvoice = false;
      this.dialogPayorRejectInvoice = false;
      this.dialogPayorConfirmed = false;
    },
    openConfirm() {
      this.dialogViewInvoice = false;
      this.dialogPreviewInvoice = false;
      this.dialogViewFundedInvoice = false;
      this.dialogSendInvoiceForVerification = false;
      this.dialogVerificationMessage = false;
      this.dialogConfirm = true;
      this.dialogViewInvoiceForRemind = false;
      this.dialogReminderMessage = false;
      this.dialogPayorConfirmInvoice = false;
      this.dialogPayorRejectInvoice = false;
      this.dialogPayorConfirmed = false;
    },
    openVerificationMessage() {
      this.dialogViewInvoice = false;
      this.dialogPreviewInvoice = false;
      this.dialogViewFundedInvoice = false;
      this.dialogSendInvoiceForVerification = false;
      this.dialogVerificationMessage = true;
      this.dialogConfirm = false;
      this.dialogViewInvoiceForRemind = false;
      this.dialogReminderMessage = false;
      this.dialogPayorConfirmInvoice = false;
      this.dialogPayorRejectInvoice = false;
      this.dialogPayorConfirmed = false;

      this.verificationMessageData.message = "";
      this.verificationMessageData.message += this.invoice.customer;
      this.verificationMessageData.message += ",\n\n";
      this.verificationMessageData.message += (this.clientName || "A supplier") + " has sent this invoice [" + this.invoice.number + "] to you ";
      this.verificationMessageData.message += "for services rendered as at " + this.invoice.submitted_date + ". ";
      this.verificationMessageData.message += "Please review here to confirm or reply to this email.";
      this.verificationMessageData.message += "\n\n";
      this.verificationMessageData.message += "Thank you\n";
    },
    openPreviewInvoice() {
      this.dialogViewInvoice = false;
      this.dialogPreviewInvoice = true;
      this.dialogViewFundedInvoice = false;
      this.dialogSendInvoiceForVerification = false;
      this.dialogVerificationMessage = false;
      this.dialogConfirm = false;
      this.dialogViewInvoiceForRemind = false;
      this.dialogReminderMessage = false;
      this.dialogPayorConfirmInvoice = false;
      this.dialogPayorRejectInvoice = false;
      this.dialogPayorConfirmed = false;
    },
    openPayorConfirmInvoice() {
      this.dialogViewInvoice = false;
      this.dialogPreviewInvoice = false;
      this.dialogViewFundedInvoice = false;
      this.dialogSendInvoiceForVerification = false;
      this.dialogVerificationMessage = false;
      this.dialogConfirm = false;
      this.dialogViewInvoiceForRemind = false;
      this.dialogReminderMessage = false;
      this.dialogPayorConfirmInvoice = true;
      this.dialogPayorRejectInvoice = false;
      this.dialogPayorConfirmed = false;
    },
    openPayorRejectInvoice() {
      this.dialogViewInvoice = false;
      this.dialogPreviewInvoice = false;
      this.dialogViewFundedInvoice = false;
      this.dialogSendInvoiceForVerification = false;
      this.dialogVerificationMessage = false;
      this.dialogConfirm = false;
      this.dialogViewInvoiceForRemind = false;
      this.dialogReminderMessage = false;
      this.dialogPayorConfirmInvoice = false;
      this.dialogPayorRejectInvoice = true;
      this.dialogPayorConfirmed = false;
    },
    openPayorConfirmed() {
      this.dialogViewInvoice = false;
      this.dialogPreviewInvoice = false;
      this.dialogViewFundedInvoice = false;
      this.dialogSendInvoiceForVerification = false;
      this.dialogVerificationMessage = false;
      this.dialogConfirm = false;
      this.dialogViewInvoiceForRemind = false;
      this.dialogReminderMessage = false;
      this.dialogPayorConfirmInvoice = false;
      this.dialogPayorRejectInvoice = false;
      this.dialogPayorConfirmed = true;
    },
    clickFund() {
      this.openVerificationMessage();
    },
    clickSendVerification() {
      var url = "/api/invoices/" + this.invoice.id + "/verification/status/requested";
      EventBus.$emit('show-full-loading');
      Vue.axios.put(url,
        {
          'message': this.verificationMessageData.message
        },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            this.openConfirm();
          }
        }).catch((err) =>{
          console.log(err);
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to request verification.');
        }
      );
    },
    clickPayorInform() {
      var url = "/api/invoices/" + this.invoice.id + "/payor/inform";
      EventBus.$emit('show-full-loading');
      Vue.axios.put(url,
        { },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.status === 200) {
            EventBus.$emit('show-success', 'Email sent to customer.');
          }
        }).catch((err) =>{
          console.log(err);
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to inform payor.');
        }
      );
    },
    clickSendVerificationMessage() {

    },
    clickPreviewInvoice() {
      this.openPreviewInvoice();
    },

    clickPayorInvoiceConfirm() {
      this.dialogPayorConfirmInvoice = false;
      var url = "/api/invoices/" + this.invoice.id + "/verification/status/bypayor/accepted";
      EventBus.$emit('show-full-loading');
      Vue.axios.put(url,
        {
          vero_id: this.$route.query.vero_id,
          payorIpaddr: ip.address()
        },
        {
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            this.openPayorConfirmed();
          }
        }).catch((err) =>{
          console.log(err);
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to confirm invoice.');
        }
      );
    },
    clickPayorInvoiceReject() {
      this.dialogPayorRejectInvoice = false;
      var url = "/api/invoices/" + this.invoice.id + "/verification/status/bypayor/disputed";
      EventBus.$emit('show-full-loading');
      Vue.axios.put(url,
        {
          'message': this.payorRejectMessageData.message,
          vero_id: this.$route.query.vero_id,
          payorIpaddr: ip.address()
        },
        {
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            EventBus.$emit('show-success', 'Rejected invoice');
          }
        }).catch((err) =>{
          console.log(err);
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to reject invoice.');
        }
      );
    }
  },

  computed: {
    showFundButton() {
      return (this.invoice.computedState || '').toLowerCase() === 'fundable' && this.invoice.email_address_opt
    }
  }
}
