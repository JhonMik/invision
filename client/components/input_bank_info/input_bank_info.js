import Vue from 'vue'
import PrettyCheckbox from 'pretty-checkbox-vue'
import {required, numeric} from 'vuelidate/lib/validators'
Vue.use(PrettyCheckbox);

export default {
    data() {
        return {
            bankname: '',
            transitnumber: '',
            institutionnumber: '',
            accountnumber: ''
        }
    },
    methods: {
        onClick() {
            this.$router.push('/upload_document');
        }
    },
    validations: {
        bankname: {required},
        transitnumber: {required, numeric},
        institutionnumber: {required, numeric},
        accountnumber: {required, numeric}
    },
    computed: {
        banknameErrors() {
            const errors=[];
            if (!this.$v.bankname.$dirty) return errors;
            !this.$v.bankname.required && errors.push("Bank name is required");
            return errors;
        },
        transitnumberErrors() {
            const errors=[];
            if (!this.$v.transitnumber.$dirty) return errors;
            !this.$v.transitnumber.required && errors.push("Transit number is required");
            !this.$v.transitnumber.numeric && errors.push("Input only number");
            return errors;
        },
        institutionnumberErrors() {
            const errors=[];
            if (!this.$v.institutionnumber.$dirty) return errors;
            !this.$v.institutionnumber.required && errors.push("Institution number is required");
            !this.$v.institutionnumber.numeric && errors.push("Input only number");
            return errors;
        },
        accountnumberErrors() {
            const errors=[];
            if (!this.$v.accountnumber.$dirty) return errors;
            !this.$v.accountnumber.required && errors.push("Account number is required");
            !this.$v.accountnumber.numeric && errors.push("Input only number");
            return errors;
        }
            
    },
    mounted() {

    }
}