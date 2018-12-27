export default {
    methods: {

        continue() {
            const router = this.$router;
            setTimeout(function () {
                router.push('/invoice_preview');
            }, 3000);
        }
    },
    computed:  {

    },
    mounted() {
        this.continue();
    }
}