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
          value: 'importedData.customer'
        },
        {
          text: 'Email',
          align: 'left',
          value: 'importedData.email_address_opt'
        },
        {
          text: 'Status',
          align: 'left',
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
      invoices: [],
      states: [],
      clientId: -1,
      client: {},
    }
  },
  methods: {
    loadInvoicesData(resolve, reject) {
      EventBus.$emit('show-full-loading');
      Vue.axios.request({
        method: 'post',
        url: '/api/invoices/getbyclient',
        data: { 'uuid': this.client.uuid },
        headers: { 'Authorization': 'Bearer ' + localStorage.token }
      }).then((response) => {
        EventBus.$emit('hide-full-loading');
        if (response.data) {
          this.invoices = response.data
          console.log(this.invoices)
        }
        resolve('get invoice for a client success');
      }).catch((err) => {
        console.error(err);
        EventBus.$emit('hide-full-loading');
        EventBus.$emit('show-error', 'Failed to get invoices for a client.');
        resolve('get invoice for a client failed');
      }
      );
    },
    loadClientData(resolve, reject) {
      EventBus.$emit('show-full-loading');
      Vue.axios.get('/api/clients/inlocal/' + this.clientId,
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            this.client = response.data;
          }
          resolve('get client data success');
        }).catch((err) =>{
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to get clients.');
          reject('failed to get client data');
        });
    },
    runLoadClientData() {
      let clientDataPromise = new Promise(this.loadClientData);
      clientDataPromise.then((successMessage) => {
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
    },
    clickApproveFunding(invoiceId) {
      var url = `/api/invoices/${invoiceId}/verification/status/byadmin/approved`;
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
        EventBus.$emit('show-error', 'Failed to send invoice approval event.');
        EventBus.$emit('hide-full-loading');
      });
    },
    clickRejectInvoice(invoiceId) {
      var url = `/api/invoices/${invoiceId}/verification/status/byadmin/rejected`;
      EventBus.$emit('show-full-loading');
      Vue.axios.put(url, {
        headers: { 'Authorization': 'Bearer ' + localStorage.token }
      }).then((response) => {
        if (response.data) {
          EventBus.$emit('show-success', 'Invoice rejected.');
          EventBus.$emit('hide-full-loading');
        }
      }).catch((err) => {
        console.error(err);
        EventBus.$emit('show-error', 'Failed to send invoice rejection event.');
        EventBus.$emit('hide-full-loading');
      });
    },
  },

  mounted() {
    if (!this.checkAdminAuth()) {
      this.$router.push('/admin/auth');
      EventBus.$emit('show-error', 'You should authenticate first.');
      return false;
    }
    
    if (this.$route.params.hasOwnProperty("id")) {
      this.clientId = this.$route.params.id;
    }

    if (this.clientId != -1) {
      this.runLoadClientData();
    }
  }
}
