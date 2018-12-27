export default {
  props: [
  ],
  data: () => ({
    show: true
  }),
  methods: {
    clickLogout() {
      delete localStorage.token;
      delete localStorage.adminToken;
      this.$router.push('/signin');
    }
  },
  computed: {
    
  }
}
