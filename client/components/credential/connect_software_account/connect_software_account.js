export default {
  computed: {
  },

  methods: {
    onClickLogo(logoname) {
      switch (logoname) {
        case 'qb':
          this.$router.push('/connect_software_account/qb');
        break;
        default:
        break;
      }
    }
  }
}
