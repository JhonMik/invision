import {required} from 'vuelidate/lib/validators'

export default {
  data() {
    return {
      username: '',
      password: '',
      attemptSubmit: false
    };
  },
  methods: {
    connectQb() {
      this.attemptSubmit = true;
      if (this.$v.$invalid) {
        return;
      }
      this.$router.push('/connect_software_account/qb/connecting')
    }
  },
  validations: {
    username: {required},
    password: {required}
  },
  computed: {
    usernameErrors() {
      const errors=[];
      if (!this.$v.username.$dirty) return errors;
      !this.$v.username.required && errors.push("UserName is required");
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