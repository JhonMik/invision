import Vue from 'vue'
import pdf from 'vue-pdf'
import { EventBus } from '@/event-bus.js'

export default {
  components: {
    pdf
  },
  data() {
    return {
      invoices: [],
      currentCategory: "all",
    }
  },

  privates: {
    
  },

  methods: {
    clickInvoice(id) {
      
    },
    selectCategory(category) {
      this.currentCategory = category;
      this.loadInvoicesData(category);
    },
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    selectedTab(category) {
      return category == this.currentCategory && !this.newInvoice ? "tab-active" : "";
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
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            this.invoices = response.data;
          }
        }).catch((err) =>{
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to get invoices.');
        }
      );
    }
  },

  mounted() {
    this.loadInvoicesData();
  }
}
