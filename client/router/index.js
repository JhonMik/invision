import Vue from 'vue'
import Router from 'vue-router'
import AutoAuth from '@/components/credential/auto_auth/auto_auth.vue'
import Signin from '@/components/credential/signin/signin.vue'
import Signup from '@/components/credential/signup/signup.vue'
import AddCompanyDetails from '@/components/credential/add_company_details/add_company_details.vue'
import AddInvoice from '@/components/credential/add_invoice/add_invoice.vue'
import ConnectBankAccount from '@/components/credential/connect_bank_account/connect_bank_account.vue'
import DirectDeposit from '@/components/credential/direct_deposit/direct_deposit.vue'
import SigninBank from '@/components/credential/signin_bank/signin_bank.vue'
import AdminAuth from '@/components/admin_auth/admin_auth.vue'
import AdminClients from '@/components/admin_clients/admin_clients.vue'
import AdminClient from '@/components/admin_client/admin_client.vue'
import AdminPayors from '@/components/admin_payors/admin_payors.vue'
import AdminPayor from '@/components/admin_payor/admin_payor.vue'
import ClientDashboard from '@/components/client_dashboard/client_dashboard.vue'
import ClientInvoices from '@/components/client_invoices/client_invoices.vue'
import ClientCustomers from '@/components/client_customers/client_customers.vue'
import ClientSettings from '@/components/client_settings/client_settings.vue'
import PayorDashboard from '@/components/payor_dashboard/payor_dashboard.vue'
import PayorInvoices from '@/components/payor_invoices/payor_invoices.vue'
import PayorInvoice from '@/components/payor_invoice/payor_invoice.vue'
import PayorInvoiceReview from '@/components/payor_invoice_review/payor_invoice_review.vue'
import ConnectSoftwareAccount from '@/components/credential/connect_software_account/connect_software_account.vue'
import ConnectQbAccount from '@/components/credential/connect_qb_account/connect_qb_account.vue'
import ConnectingQbAccount from '@/components/credential/connecting_qb_account/connecting_qb_account.vue'
import InvoicePreview from '@/components/invoice_preview/invoice_preview.vue'
import InputBankInfo from '@/components/input_bank_info/input_bank_info.vue'
import UploadDocument from '@/components/upload_document/upload_document.vue'
import FinishConnection from '@/components/finish_connection/finish_connection.vue'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      meta: {
        title: 'Home'
      },
      redirect: '/signup'
    },
    {
      path: '/auth/ftx',
      name: 'Auto Auth',
      meta: {
        title: 'Auto Auth'
      },
      component: AutoAuth
    },
    {
      path: '/auto_auth',
      name: 'Auto Auth Main',
      meta: {
        title: 'Auto Auth'
      },
      component: AutoAuth
    },
    {
      path: '/signin',
      name: 'Sign In',
      meta: {
        title: 'Sign In'
      },
      component: Signin
    },
    {
      path: '/signup',
      name: 'Sign Up',
      meta: {
        title: 'Sign Up'
      },
      component: Signup
    },
    {
      path: '/add_company_details',
      name: 'Add Company Details',
      meta: {
        title: 'Add Company Details'
      },
      component: AddCompanyDetails
    },
    {
      path: '/add_invoice',
      name: 'Add an Invoice',
      meta: {
        title: 'Add an Invoice'
      },
      component: AddInvoice
    },
    {
      path: '/connect_bank_account',
      name: 'Connect Bank Account',
      meta: {
        title: 'Connect Bank Account'
      },
      component: ConnectBankAccount
    },
    {
      path: '/connect_software_account',
      name: 'Connect Software Account',
      meta: {
        title: 'Connect Software Account'
      },
      component: ConnectSoftwareAccount
    },
    {
      path: '/connect_software_account/qb',
      name: 'Connect QuickBooks Account',
      meta: {
        title: 'Connect QuickBook Account'
      },
      component: ConnectQbAccount
    },
    {
      path: '/connect_software_account/qb/connecting',
      name: 'Connecting QuickBooks Account',
      meta: {
        title: 'Connecting QuickBooks Account'
      },
      component: ConnectingQbAccount
    },
    {
      path: '/input_bank_info',
      name: 'Input Bank Info',
      meta: {
        title: 'Input Bank Info'
      },
      component: InputBankInfo
    },
    {
      path: '/upload_document',
      name: 'Upload Document',
      meta: {
        title: 'Upload Document'
      },
      component: UploadDocument
    },
    {
      path: '/finish_connection',
      name: 'Finish Connection',
      meta: {
        title: 'Finish Connection'
      },
      component: FinishConnection
    },
    {
      path: '/invoice_preview',
      name: 'Invoice Preview',
      meta: {
        title: 'Invoice Preview'
      },
      component: InvoicePreview
    },
    {
      path: '/direct_deposit',
      name: 'Direct Deposit',
      meta: {
        title: 'Direct Deposit'
      },
      component: DirectDeposit
    },
    {
      path: '/signin_bank',
      name: 'Sign In Bank',
      meta: {
        title: 'Sign In Bank'
      },
      component: SigninBank
    },
    {
      path: '/admin',
      redirect: '/admin/clients'
    },
    {
      path: '/admin/auth',
      name: 'Admin Auth',
      meta: {
        title: 'Admin Authentication'
      },
      component: AdminAuth
    },
    {
      path: '/admin/clients',
      name: 'Admin Clients',
      meta: {
        title: 'Clients Administration'
      },
      component: AdminClients
    },
    {
      path: '/admin/client/:id',
      name: 'Admin Client',
      meta: {
        title: 'Client Administration'
      },
      component: AdminClient
    },
    {
      path: '/admin/payors',
      name: 'Admin Payors',
      meta: {
        title: 'Payors Administration'
      },
      component: AdminPayors
    },
    {
      path: '/admin/payor/:id',
      name: 'Admin Payor',
      meta: {
        title: 'Payor Administration'
      },
      component: AdminPayor
    },
    {
      path: '/client/dashboard',
      name: 'Client Dashboard',
      meta: {
        title: 'Client Dashboard'
      },
      component: ClientDashboard
    },
    {
      path: '/client/invoices',
      name: 'Client Invoices',
      meta: {
        title: 'Client Invoices'
      },
      component: ClientInvoices
    },
    {
      path: '/client/customers',
      name: 'Client Customers',
      meta: {
        title: 'Client Customers'
      },
      component: ClientCustomers
    },
    {
      path: '/client/settings',
      name: 'Client Settings',
      meta: {
        title: 'Client Settings'
      },
      component: ClientSettings
    },
    {
      path: '/payor/dashboard',
      name: 'Payor Dashboard',
      meta: {
        title: 'Payor Dashboard'
      },
      component: PayorDashboard
    },
    {
      path: '/payor/invoices',
      name: 'Payor Invoices',
      meta: {
        title: 'Payor Invoices'
      },
      component: PayorInvoices
    },
    {
      path: '/payor/invoice/:token',
      name: 'Payor Invoice',
      meta: {
        title: 'Invoice'
      },
      component: PayorInvoice
    },
    {
      path: '/payor/invoices_review',
      name: 'Payor Invoice Review',
      meta: {
        title: 'Review Invoices'
      },
      component: PayorInvoiceReview
    }
  ]
})

router.beforeEach((to, from, next) => {
  // if (!localStorage.token && to.name !== 'Sign In' && to.name !== 'Sign Up' && to.name !== 'Payor Invoice') {
  //   next('/');
  // } else {
  //   next();
  // }
  next();
});

export default router;
