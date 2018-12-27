import {required} from 'vuelidate/lib/validators'

export default {
    data() {
        return {
            companyname: '',
            country: '',
            province: '',
            city: '',
            businessstructure: '',
            businessindustry: '',
            upload_dialog: false
        }
    },
    validations: {
        companyname: {required},
        country: {required},
        province: {required},
        city: {required},
        businessstructure: {required},
        businessindustry: {required}
    },
    methods: {
        uploadDialog () {
            this.upload_dialog = true
        },
        onContinue () {
            this.$router.push('/finish_connection');
        }
    },
    computed: {
        companynameErrors() {
            const errors=[];
            if (!this.$v.companyname.$dirty) return errors;
            !this.$v.companyname.required && errors.push("Bank name is required");
            return errors;
        },
        countryErrors() {
            const errors=[];
            if (!this.$v.country.$dirty) return errors;
            !this.$v.country.required && errors.push("Bank name is required");
            return errors;
        },
        provinceErrors() {
            const errors=[];
            if (!this.$v.province.$dirty) return errors;
            !this.$v.province.required && errors.push("Bank name is required");
            return errors;
        },  
        cityErrors() {
            const errors=[];
            if (!this.$v.city.$dirty) return errors;
            !this.$v.city.required && errors.push("Bank name is required");
            return errors;
        },
        businessstructureErrors() {
            const errors=[];
            if (!this.$v.businessstructure.$dirty) return errors;
            !this.$v.businessstructure.required && errors.push("Bank name is required");
            return errors;
        },
        businessindustryErrors() {
            const errors=[];
            if (!this.$v.businessindustry.$dirty) return errors;
            !this.$v.businessindustry.required && errors.push("Bank name is required");
            return errors;
        }
    }
}