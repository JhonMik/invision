import ClientSidebar from '@/components/sidebars/client_sidebar/client_sidebar.vue'
import PayorSidebar from '@/components/sidebars/payor_sidebar/payor_sidebar.vue'
import AdminSidebar from '@/components/sidebars/admin_sidebar/admin_sidebar.vue'
import loading from 'vue-full-loading'
import { EventBus } from '@/event-bus.js'

export default {
  components: {
    'client-sidebar': ClientSidebar,
    'admin-sidebar': AdminSidebar,
    'payor-sidebar': PayorSidebar,
    loading
  },

  data: () => ({
    showNotify: false,
    notifyColor: '',
    notifyText: '',
    fullLoadingLabel: 'Loading...'
  }),

  methods: {
    showSuccess(message) {
      this.showNotify = true;
      this.notifyColor = "success";
      this.notifyText = message;
    },
    showError(message) {
      this.showNotify = true;
      this.notifyColor = "error";
      this.notifyText = message;
    },
    showSidebar() {
      this.$refs.sidebar.show = true;
    },
  },
  computed: {
    globalEventBus() {
      return EventBus;
    },
    hideSidebar() {
      var hide = false;
      switch (this.$route.name) {
        case 'Home':
        hide = true;
        break;

        case 'Payor Invoice':
        hide = true;
        break;

        default:
        hide = false;
        break;
      }

      return hide;
    },
    showAdminSidebar() {
      var show = false;
      switch (this.$route.name) {
        case 'Admin Clients':
        case 'Admin Client':
        case 'Admin Payors':
        case 'Admin Payor':
          show = true;
          break;
        default:
          show = false;
      }

      return show;
    },
    hideTopbar() {
      var hide = false;
      switch (this.$route.name) {
        case 'Home':
        hide = true;
        break;

        case 'Sign Up':
        hide = true;
        break;

        case 'Sign In':
        hide = true;
        break;

        case 'Connect Software Account':
        hide = true;
        break;

        case 'Connect QuickBooks Account':
        hide = true;
        break;
        
        case 'Connecting QuickBooks Account':
        hide = true;
        break;

        case 'Invoice Preview':
        hide = true;
        break;

        case 'Input Bank Info':
        hide = true;
        break;
        
        case 'Upload Document':
        hide = true;
        break;

        case 'Finish Connection':
        hide = true;
        break;

        default:
        hide = false;
        break;
      }

      return hide;
    },
    hideShowSidebarButton() {
      return !this.isPayor && !this.isClient && !this.isAdmin;
    },
    isPayor() {
      var ret = true;
      if (this.$route.path.substring(1, 6) == "payor") {
        ret = true;
      } else {
        ret = false;
      }

      return ret;
    },
    isClient() {
      var ret = true;
      if (this.$route.path.substring(1, 7) == "client") {
        ret = true;
      } else {
        ret = false;
      }

      return ret;
    },
    isAdmin() {
      var ret = true;
      if (this.$route.path.substring(1, 6) == "admin") {
        ret = true;
      } else {
        ret = false;
      }

      return ret;
    },
  },

  created() {
    EventBus.$on('show-success', this.showSuccess);
    EventBus.$on('show-error', this.showError);
  },
  
  destroyed() {
    EventBus.$off('show-success', this.showSuccess);
    EventBus.$off('show-error', this.showError);
  }
}
