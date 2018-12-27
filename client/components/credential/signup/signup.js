import Vue from 'vue'
import { EventBus } from '@/event-bus.js'
import {required, sameAs, minLength, email, helpers} from 'vuelidate/lib/validators'

const checked = (value) => !!value;
const phone = helpers.regex('alpha', /^[0-9]{10}$/);
const password = helpers.regex('alpha', /^(((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})/);

export default {
  data() {
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      agree: '',
    };
  },
  validations: {
    name: {required},
    email: {required, email},
    phone: {required, phone},
    password: {required, password},
    agree: { checked }
  },
  mounted() {

  },
  computed: {
    environment() {
      return process.env;
    },
    nameErrors() {
      const errors=[];
      if (!this.$v.name.$dirty) return errors;
      !this.$v.name.required && errors.push("Name shouldn't be empty.");
      return errors;
    },
    emailErrors() {
      const errors=[];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
    phoneErrors() {
      const errors=[];
      if (!this.$v.phone.$dirty) return errors;
      !this.$v.phone.phone && errors.push("Must be valid phone number");
      !this.$v.phone.required && errors.push("Phone number is required");
      return errors;
    },
    passwordErrors() {
      const errors=[];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.password && errors.push("Must contain one capital letter and number and longer than 8 characters.");
      !this.$v.password.required && errors.push("Password shouldn't be empty.");
      return errors;
    },
    agreeErrors() {
      const errors=[];
      if (!this.$v.agree.$dirty) return errors;
      !this.$v.agree.checked && errors.push("You must agree with Terms & Policy.");
      return errors;
    }
  },
  methods: {
    submitSignupForm(e) {
      this.$v.name.$touch();
      this.$v.email.$touch();
      this.$v.phone.$touch();
      this.$v.password.$touch();
      this.$v.agree.$touch();
      if (this.$v.$invalid) {
        e.preventDefault();
        return;
      }
    }
  }
};
