import Vue from 'vue'
import PrettyCheckbox from 'pretty-checkbox-vue';

Vue.use(PrettyCheckbox);
export default {
    data() {
        return {
            pay_dialog: false,
            email_to_customer: false,
            e1: 1,
            sample_text: '(Payor Name),\nAttached please find the invoice(s) for our services rendered. If services have not been rendered or delivered as expected, we require you to notify us immediately in writing; otherwise payment for the full amount is expected to be issued to in due course.\n\nSincerely,\nClient Name\nClient Email'
        }
    },
    methods: {
        getPaid() {
            this.pay_dialog = true;
            this.e1 = 1
        },
        continueWithEmail() {
            this.$router.push('/input_bank_info');
        }
    },
    computed: {

    }
}