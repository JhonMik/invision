import InvoiceNotification from "../common/invoice_notification/invoice_notification.vue"
import Vue from 'vue'
import pdf from 'vue-pdf'

export default {
  components: {
    'invoice-notification': InvoiceNotification,
    pdf
  },

  data() {
    return {
      invoices: [ 
      //dummy data
        {
          id: 0,
          title: "Test Invoice #1",
          payor: "John Smith",
          amount: 100.00,
          status: "pending"
        },
        {
          id: 1,
          title: "Test Invoice #2",
          payor: "John Smith",
          amount: 200.00,
          status: "pending"
        },
        {
          id: 2,
          title: "Test Invoice #1",
          payor: "John Smith",
          amount: 100.00,
          status: "verified"
        },
        {
          id: 3,
          title: "Test Invoice #2",
          payor: "John Smith",
          amount: 200.00,
          status: "paid"
        },
        {
          id: 4,
          title: "Test Invoice #1",
          payor: "John Smith",
          amount: 100.00,
          status: "pending"
        },
        {
          id: 5,
          title: "Test Invoice #2",
          payor: "John Smith",
          amount: 200.00,
          status: "rejected"
        }
      ],

      showNotification: false,
      currentCategory: "pending",
    }
  },

  privates: {
    
  },

  methods: {

    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    clickConfirm() {
      
    },

    clickReject() {

    }
  },

  computed: {

  }
}
