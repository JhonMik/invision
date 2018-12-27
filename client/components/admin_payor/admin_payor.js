import Vue from 'vue'
import { EventBus } from '@/event-bus.js'

export default {
  data() {
    return {
      pagination: {
        sortBy: 'customer',
        rowsPerPage: -1
      },
      headers: [
        {
          text: 'Customer',
          align: 'left',
          value: 'customer'
        },
        {
          text: 'Email',
          align: 'right',
          value: 'email'
        },
        {
          text: 'Status',
          align: 'right',
          value: 'status'
        },
        {
          text: 'Amount',
          align: 'right',
          value: 'importedData.amount'
        },
        {
          text: 'Actions',
          align: 'center',
          sortable: false
        },
      ],
      customerId: -1,
      customer: {},
      invoices: []
    }
  },
  methods: {
    clickRemindInvoice(invoiceId) {
      var url = `/api/invoices/${invoiceId}/verification/status/byadmin/reminded`;
      EventBus.$emit('show-full-loading');
      Vue.axios.put(url, {
        headers: { 'Authorization': 'Bearer ' + localStorage.token }
      }).then((response) => {
        if (response.data) {
          EventBus.$emit('show-success', 'Email triggered.');
          EventBus.$emit('hide-full-loading');
        }
      }).catch((err) => {
        console.error(err);
        EventBus.$emit('show-error', 'Failed to send invoice reminder event.');
        EventBus.$emit('hide-full-loading');
      });
    },
    loadInvoicesData(resolve, reject) {
      EventBus.$emit('show-full-loading');
      Vue.axios.post('/api/invoices/inlocal/bycustomer',
        {
          'email': this.customer.email
        },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            this.invoices = response.data
          }
          resolve('get invoice for a customer success');
        }).catch((err) =>{
          console.log(err);
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to get invoice for a customer.');
          resolve('get invoice for a customer failed');
        }
      );
    },
    loadCustomerData(resolve, reject) {
      EventBus.$emit('show-full-loading');
      Vue.axios.get('/api/customers/inlocal/' + this.customerId,
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            this.customer = response.data;
          }
          resolve('get customer data success');
        }).catch((err) =>{
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to get customers.');
          reject('failed to get customer data');
        });
    },
    runLoadCustomerData() {
      let customerDataPromise = new Promise(this.loadCustomerData);
      customerDataPromise.then((successMessage) => {
        console.log(successMessage);
        this.runLoadInvoicesData();
      }).catch((failMessage) => {
        console.log(failMessage);
      });
    },
    runLoadInvoicesData() {
      let invoicesDataPromise = new Promise(this.loadInvoicesData);
      invoicesDataPromise.then((successMessage) => {
        console.log(successMessage);
      }).catch((failMessage) => {
        console.log(failMessage);
      });
    }
  },
  mounted() {
    if (!this.checkAdminAuth()) {
      this.$router.push('/admin/auth');
      EventBus.$emit('show-error', 'You should authenticate first.');
      return false;
    }
    
    if (this.$route.params.hasOwnProperty("id")) {
      this.customerId = this.$route.params.id;
    }

    if (this.customerId != -1) {
      this.runLoadCustomerData();
    }
  }
}
