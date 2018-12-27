import Vue from 'vue'
import { EventBus } from '@/event-bus.js'
import { ExportToCsv } from 'export-to-csv';

export default {
  data() {
    return {
      pagination: {
        sortBy: 'name',
        rowsPerPage: -1
      },
      headers: [
        {
          text: 'Name',
          align: 'left',
          value: 'name'
        },
        {
          text: 'Email',
          align: 'right',
          value: 'email'
        },
        {
          text: 'Credit Model',
          align: 'right',
          value: 'creditModel'
        },
        {
          text: 'Actions',
          align: 'center',
          sortable: false
        },
      ],
      creditModelList: [],
      clients: []
    }
  },
  methods: {
    showClientName(item) {
      if (item.jekyllUserData) {
        return (item.jekyllUserData.company_name || item.jekyllUserData.name || item.jekyllUserData.uuid);
      } else {
        return (item.uuid);
      }
    },
    loadCreditModelList(resolve, reject) {
      EventBus.$emit('show-full-loading');
      Vue.axios.get('/api/clients/credit_model_list',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            var creditModels = response.data;
            var tempCreditModelList = [];
            Object.keys(creditModels).forEach(function(key) {
              let element = {text: creditModels[key], value: key};
              tempCreditModelList.push(element);
            });
            this.creditModelList = tempCreditModelList;
            resolve('get credit model list success');
          }
        }).catch((err) =>{
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to get credit model list.');
          reject('get credit model list failed.');
        });
    },
    loadClientsData(resolve, reject) {
      EventBus.$emit('show-full-loading');
      Vue.axios.get('/api/clients/inlocal/',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            this.clients = response.data;
          }
          resolve('get clients data success');
        }).catch((err) =>{
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to get clients.');
          reject('get clients data failed');
        });
    },
    runLoadCreditModelData() {
      let creditModelListPromise = new Promise(this.loadCreditModelList);
      creditModelListPromise.then((successMessage) => {
        console.log(successMessage);
        this.runLoadClientsData();
      }).catch((failMessage) => {
        console.log(failMessage);
        this.runLoadClientsData();
      });
    },
    runLoadClientsData() {
      let clientsDataPromise = new Promise(this.loadClientsData);
      clientsDataPromise.then((successMessage) => {
        console.log(successMessage);
      }).catch((failMessage) => {
        console.log(failMessage);
      });
    },
    clickClient(id) {
      this.$router.push('/admin/client/' + id);
    },
    clickBankingConnected(uuid) {
      var url = "/api/dashboard/email/client_banking_connected/" + uuid;
      EventBus.$emit('show-full-loading');
      Vue.axios.post(url,
        {
        },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            EventBus.$emit('show-success', 'Email triggered.');
          }
        }).catch((err) =>{
          console.log(err);
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to send event-client_banking_connected.');
        }
      );
    },
    clickBankingUnconnected(uuid) {
      var url = "/api/dashboard/email/client_banking_unconnected/" + uuid;
      EventBus.$emit('show-full-loading');
      Vue.axios.post(url,
        {
        },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            EventBus.$emit('show-success', 'Email triggered.');
          }
        }).catch((err) =>{
          console.log(err);
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to send event-client_banking_unconnected.');
        }
      );
    },
    clickInvoicingReminded(uuid) {
      var url = "/api/dashboard/email/client_invoicing_reminded/" + uuid;
      EventBus.$emit('show-full-loading');
      Vue.axios.post(url,
        {
        },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            EventBus.$emit('show-success', 'Email triggered.');
          }
        }).catch((err) =>{
          console.log(err);
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to send event-client_invoicing_reminded.');
        }
      );
    },
    async exportClientData(uuid) {
      EventBus.$emit('show-full-loading');
      Vue.axios.request({
        method: 'post',
        url: '/api/invoices/getbyclient',
        data: { 'uuid': uuid },
        headers: { 'Authorization': 'Bearer ' + localStorage.token }
      }).then(response => {
        if (response.data) {
          EventBus.$emit('hide-full-loading');
          if (response.data.length == 0) {
            EventBus.$emit('show-error', 'No invoices available for this client.');
          } else {
            const exportData = response.data.map(invoice => {
              return {
                customer_name: invoice.customer,
                invoice_number: invoice.number,
                invoice_date: invoice.submitted_date,
                face_value: invoice.amount,
                due_date: invoice.due_date
              };
            });
            const csvExporter = new ExportToCsv({ filename: `client-${uuid}`, showLabels: true, useKeysAsHeaders: true });
            csvExporter.generateCsv(exportData);
          }
        }
      }).catch(err => {
        console.error(err);
        EventBus.$emit('hide-full-loading');
        EventBus.$emit('show-error', 'Failed to get invoice data for a client.');
      });
    },
    changedCreditModel(client) {
      var url = "/api/clients/" + client._id + "/update";
      EventBus.$emit('show-full-loading');
      Vue.axios.put(url,
        {
          'creditModel': client.creditModel 
        },
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            if (response.data.success) {
              EventBus.$emit('show-success', 'Updated credit model.');
            } else {
              EventBus.$emit('show-error', 'Failed to update credit model.');
            }
          }
        }).catch((err) =>{
          console.log(err);
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to update credit model.');
        }
      );
    }
  },
  mounted() {
    if (!this.checkAdminAuth()) {
      this.$router.push('/admin/auth');
      EventBus.$emit('show-error', 'You should authenticate first.');
      return false;
    }
    this.runLoadCreditModelData();
  }
}
