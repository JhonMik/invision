import InvoiceNotification from "@/components/common/invoice_notification/invoice_notification.vue"
import Vue from 'vue'
import { EventBus } from '@/event-bus.js'

export default {
  components: {
    'invoice-notification': InvoiceNotification
  },

  data() {
    return {
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
      }
    }
  },
  privates: {
    
  },
  methods: {
    loadInvoiceDataWithToken(token) {
      let url = "/api/invoices/bytoken/" + token;
      EventBus.$emit('show-full-loading');
      Vue.axios.get(url)
      .then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            this.invoice = response.data[0];
          }
        }).catch((err) =>{
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to get invoice.');
        }
      );
    },
    clickReject() {
      this.$refs.invoiceNotification.invoice = this.invoice;
      this.$refs.invoiceNotification.openPayorRejectInvoice();
    },

    clickConfirm() {
      this.$refs.invoiceNotification.invoice = this.invoice;
      this.$refs.invoiceNotification.openPayorConfirmInvoice();
    }
  },
  computed: {
    showRejectAndConfirm() {
      for (var i = this.invoice.events.length - 1; i >= 0; i--) {
        if (this.invoice.events[i].descriptor === 'invoice_verification_accepted'
          || this.invoice.events[i].descriptor === 'invoice_verification_disputed') {
          return false;
        }
      }
      return true;
    }
  },
  mounted() {
    let token = '';
    if (this.$route.params.hasOwnProperty("token")) {
      token = this.$route.params.token;
    }

    this.loadInvoiceDataWithToken(token);
  }
}
