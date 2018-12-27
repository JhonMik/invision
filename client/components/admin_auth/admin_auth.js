import Vue from 'vue'
import { EventBus } from '@/event-bus.js'

export default {
  data() {
    return {
      password: '',
    }
  },

  methods: {
    clickAuthenticate() {
      EventBus.$emit('show-full-loading');
      Vue.axios.post('/auth/admin',
        {
          "password": this.password
        }).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.status == 200) {
            EventBus.$emit('show-success', 'Sign in Success!');
            if (response.data && response.data.token) {
              localStorage.adminToken = response.data.token;
              this.$router.push('/admin/clients');
            } else {
              EventBus.$emit('show-error', 'Admin Authentication Failed!');  
            }
          } else {
            EventBus.$emit('show-error', 'Admin Authentication Failed!');
          }

        }).catch((err) => {
          EventBus.$emit('show-error', 'Admin Authentication Failed!');
          EventBus.$emit('hide-full-loading');
        });
    }
  },
  mounted() {
    if (!this.checkAuth()) {
      EventBus.$emit('show-error', 'You should sign in first!');
      this.$router.push('/signin');
      return;
    }
  }
}