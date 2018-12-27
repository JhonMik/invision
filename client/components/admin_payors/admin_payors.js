import Vue from 'vue'
import { EventBus } from '@/event-bus.js'

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
      ],
      payors: []
    }
  },
  methods: {
    loadPayorsData() {
      EventBus.$emit('show-full-loading');
      Vue.axios.get('/api/customers/inlocal',
        {
          headers: {
            'Authorization': 'Bearer ' + localStorage.token
          }
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.data) {
            this.payors = response.data;
          }
        }).catch((err) =>{
          EventBus.$emit('hide-full-loading');
          EventBus.$emit('show-error', 'Failed to get customers.');
        });
    },
    clickPayor(id) {
      this.$router.push('/admin/payor/' + id);
    }
  },
  mounted() {
    if (!this.checkAdminAuth()) {
      this.$router.push('/admin/auth');
      EventBus.$emit('show-error', 'You should authenticate first.');
      return false;
    }
    
    this.loadPayorsData();
  }
}
