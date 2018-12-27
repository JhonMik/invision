import InvoiceNotification from "@/components/common/invoice_notification/invoice_notification.vue"
import Vue from 'vue'
import { EventBus } from '@/event-bus.js'

export default {
  components: {
    'invoice-notification': InvoiceNotification
  },

  data() {
    return {
      invoices: [],
      selectMode: false,
      newInvoice: false,
      selectedIds: [],
      currentCategory: "all",
      clientName: "",
    }
  },

  methods: {
    clickInvoice(id) {
      if (this.selectMode) {
        var idInArray = this.selectedIds.indexOf(invoices[id].id);
        if (idInArray == -1) {
          this.selectedIds.push(invoices[id].id);
        } else {
          this.selectedIds.splice(idInArray, 1);
        }
      } else {
        let invoice_id = this.invoices[id].id;
        let url = "/api/invoices/" + invoice_id;
        EventBus.$emit('show-full-loading');
        Vue.axios.get(url,
          {
            headers: {
              'Authorization': 'Bearer ' + localStorage.token
            }
          }).then((response) => {
            EventBus.$emit('hide-full-loading');
            if (response.data && Array.isArray(response.data) && response.data.length > 0) {
              let invoice = response.data[0];
              this.$refs.invoiceNotification.invoice = invoice;
              this.$refs.invoiceNotification.clientName = this.clientName;
              this.$refs.invoiceNotification.openViewInvoice();
            }
          }).catch((err) =>{
            EventBus.$emit('hide-full-loading');
            EventBus.$emit('show-error', 'Failed to get invoice.');
          }
        );
      }
      
    },

    isSelected(id) {
      var idInArray = this.selectedIds.indexOf(id);
      return idInArray != -1;
    },

    selectCategory(category) {
      this.currentCategory = category;
      this.newInvoice = false;
      this.loadInvoicesData(category);
    },

    clickNewInvoice() {
      this.newInvoice = true;
      this.currentCategory = '';
    },

    clickConfirm() {
      var InvoiceNotificationClass = Vue.extend(InvoiceNotification);
      var invoiceNotification = new InvoiceNotificationClass({
        
      });

      invoiceNotification.$mount();
      this.$refs.notificationContainer.appendChild(invoiceNotification.$el);
    },

    clickVerify() {
      var InvoiceNotificationClass = Vue.extend(InvoiceNotification);
      var invoiceNotification = new InvoiceNotificationClass({
        
      });

      invoiceNotification.$mount();
      this.$refs.notificationContainer.appendChild(invoiceNotification.$el);
    },

    clickReject() {
      var InvoiceNotificationClass = Vue.extend(InvoiceNotification);
      var invoiceNotification = new InvoiceNotificationClass({
        
      });

      invoiceNotification.$mount();
      this.$refs.notificationContainer.appendChild(invoiceNotification.$el);
    },

    selectedTab(category) {
      return category == this.currentCategory && !this.newInvoice ? "tab-active" : "";
    },

    selectedNewInvoiceTab() {
      return this.newInvoice ? "tab-active" : "";
    },

    loadInvoicesData(state='') {
      var query = "";
      if (state != "all" && state != "") {
        query += ("?state=" + state);
      }
      EventBus.$emit('show-full-loading');
      Vue.axios.get('/api/invoices' + query,
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
      }).then((response) => {
        if (response.data) {
          this.invoices = response.data;
        }
        Vue.axios.get('/api/clients/current_info', {
          headers: { 'Authorization': 'Bearer ' + localStorage.token }
        }).then((response) => {
          this.clientName = response.data.company_name || response.data.name;
        }).catch(err => {
          console.log(err);
        });
        EventBus.$emit('hide-full-loading');
      }).catch((err) => {
        EventBus.$emit('hide-full-loading');
        EventBus.$emit('show-error', 'Failed to get invoices.');
      });
    }
  },

  computed: {

  },

  mounted() {
    this.loadInvoicesData();
  }
}
