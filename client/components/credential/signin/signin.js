import Vue from 'vue'
import { EventBus } from '@/event-bus.js'
import {required, minLength, email} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    clickSignin() {
      if (this.$v.$invalid) {
        console.log(this.$v);
        return;
      }

      EventBus.$emit('show-full-loading');
      Vue.axios.post('/auth/local',
        {
          "email": this.email,
          "password": this.password
        }).then((response) => {
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
  validations: {
    email: {required, email},
    password: {required}
  },
  computed: {
    emailErrors() {
      const errors=[];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors=[];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password shouldn't be empty.");
      return errors;
    }
  },
  mounted() {

  }
};