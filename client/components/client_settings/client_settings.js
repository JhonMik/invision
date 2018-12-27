import BankConnectionDialog from "@/components/common/bank_connection_dialog/bank_connection_dialog.vue"
import Vue from 'vue'
import { EventBus } from '@/event-bus.js'

export default {
  components: {
    'bank-connection-dialog': BankConnectionDialog
  },
  data() {
    return {
      
    }
  },
  computed: {
    environment() {
      return process.env;
    }
  },
  methods: {
    // temporary begin
    clickOpenBankConnectionDialog() {
      var BankConnectionDialogClass = Vue.extend(BankConnectionDialog);
      var bankConnectionDialog = new BankConnectionDialogClass({

      });
      bankConnectionDialog.$mount();
      this.$refs.notificationContainer.appendChild(bankConnectionDialog.$el);
    }
    // temporary end
  }
}