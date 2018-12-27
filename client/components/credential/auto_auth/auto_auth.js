import Vue from 'vue'
import { EventBus } from '@/event-bus.js'
import {required, minLength, email} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      uuid: -1,
    }
  },
  methods: {
    doAutoAuth() {
      EventBus.$emit('show-full-loading');
      Vue.axios.get('/auth/auto_ftx?uuid=' + this.uuid
       ).then((response) => {
          EventBus.$emit('hide-full-loading');
          if (response.status == 200) {
            EventBus.$emit('show-success', 'Sign in Success!');
            if (response.data && response.data.token) {
              localStorage.token = response.data.token;
              this.$router.push('/client/invoices');
            } else {
              EventBus.$emit('show-error', 'Sign in Failed!');  
            }
          } else {
            EventBus.$emit('show-error', 'Sign in Failed!');
          }

        }).catch((err) => {
          EventBus.$emit('show-error', 'Sign in Failed!');
          EventBus.$emit('hide-full-loading');
        });
    }
  },
  mounted() {
    if (this.$route.query.hasOwnProperty("uuid")) {
      this.uuid = this.$route.query.uuid;
    }

    if (this.uuid != -1) {
      this.doAutoAuth();
    }
  }
};