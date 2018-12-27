import Vue from 'vue'
import { EventBus } from '@/event-bus.js'

export default {
  data() {
    return {
      customers: []
    }
  },
  methods: {
    loadCustomersData() {
      EventBus.$emit('show-full-loading');
      Vue.axios.get('/api/customers',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            this.customers = response.data;
          }
        }).catch((err) =>{
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to get customers.');
        });
    }
  },
  mounted() {
    this.loadCustomersData();
  }
}
