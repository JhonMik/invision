import Vue from 'vue';
import App from './app.vue';
import router from './router';
import Vuetify from 'vuetify';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Vuelidate from 'vuelidate';
import VueIntercom from 'vue-intercom';
import VueMultianalytics from 'vue-multianalytics';
import * as Helpers from './helpers/util_functions';

// import colors from 'vuetify/es5/util/colors';
import 'vuetify/dist/vuetify.min.css';

let axiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:5050/' : '/',
  headers: {
    'Content-Type': 'application/json'
  }
});

Vue.use(VueIntercom, { appId: process.env.INTERCOM_APP_ID });

Vue.use(VueAxios, axiosInstance);
Vue.use(Vuelidate);

Vue.use(Vuetify, {
  theme: {
    primary: '#00897B'
  }
});

Vue.mixin({
  methods: Helpers
});

let segmentConfig = {
  token: process.env.CLIENT_SEGMENT_WRITE_KEY,
  debug: true
}

Vue.use(VueMultianalytics, {
  modules: {
    segment: segmentConfig
  },
  routing: {
    vueRouter: router,
    preferredProperty: 'name',
    ignoredViews: [],
    ignoredModules: []
  }
})
Vue.config.productionTip = false

/* eslint-disable no-new */
window.app = new Vue({
  el: '#app',
  router,
  axiosInstance,
  components: { App },
  template: '<App/>',
  mounted() {
    this.$intercom.boot({
      alignment: 'left'
    });
    this.$intercom.show();
  }
})
