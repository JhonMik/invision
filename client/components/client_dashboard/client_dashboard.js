import Vue from 'vue'
import { EventBus } from '@/event-bus.js'

export default {
  data() {
    return {
      invoicesSummaryData: [],
      fundedInvoicesData: [],
      paidInvoicesData: []
    }
  },
  methods: {
    loadInvoicesData(resolve, reject) {
      EventBus.$emit('show-full-loading');
      Vue.axios.get('/api/dashboard/summary',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            this.invoicesSummaryData = response.data;
            resolve("load invoices data success");
          }
        }).catch((err) =>{
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to get invoice summary.');
          reject("load invoices data fail");
        });
    },
    loadFundedInvoicesData(resolve, reject) {
      EventBus.$emit('show-full-loading');
      Vue.axios.get('/api/dashboard/funded',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            this.fundedInvoicesData = response.data;
            resolve("load funded invoices data success");
          }
        }).catch((err) =>{
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to get recently funded invoices.');
          reject("load funded invoices data fail");
        });
    },
    loadPaidInvoicesData(resolve, reject) {
      EventBus.$emit('show-full-loading');
      Vue.axios.get('/api/dashboard/paid',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            this.paidInvoicesData = response.data;
            resolve("load paid invoices data success");
          }
        }).catch((err) =>{
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to get paid invoices.');
          reject("load paid invoices data fail");
        });
    },
    runLoadInvoicesDataPromise() {
      let invDataPromise = new Promise(this.loadInvoicesData);
      invDataPromise.then((successMessage) => {
        console.log(successMessage);
        this.runFundedInvoicesPromise();
      }).catch((failMessage) => {
        console.log(failMessage);
        this.runFundedInvoicesPromise();
      });
    },
    runFundedInvoicesPromise() {
      let fundedInvDataPromise = new Promise(this.loadFundedInvoicesData);
      fundedInvDataPromise.then((successMessage) => {
        console.log(successMessage);
        this.runPaidInvoicesPromise();
      }).catch((failMessage) => {
        console.log(failMessage);
        this.runPaidInvoicesPromise();
      });
    },
    runPaidInvoicesPromise() {
      let paidInvDataPromise = new Promise(this.loadPaidInvoicesData);
      paidInvDataPromise.then((successMessage) => {
        console.log(successMessage);
      }).catch((failMessage) => {
        console.log(failMessage);
      });
    }
  },

  mounted() {
    this.runLoadInvoicesDataPromise();
  }
}
