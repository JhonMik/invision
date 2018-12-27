<template>
  <v-container fluid class="client-invoices-panel" ref="container">
    <v-container fluid class="invoices-panel">
      <v-layout row wrap>
        <v-flex xs12 sm8>
          <v-container class="invoices-grid">
            <v-layout row wrap>
              <v-flex class="category">
                <v-btn flat class="category-tab" v-bind:class="selectedTab('all')" v-on:click="selectCategory('all')">{{ stateToDisplay('all') }}</v-btn>
                <v-btn flat class="category-tab" v-bind:class="selectedTab('fundable')" v-on:click="selectCategory('fundable')">{{ stateToDisplay('fundable') }}</v-btn>
                <v-btn flat class="category-tab" v-bind:class="selectedTab('processing')" v-on:click="selectCategory('processing')">{{ stateToDisplay('processing') }}</v-btn>
                <v-btn flat class="category-tab" v-bind:class="selectedTab('funded')" v-on:click="selectCategory('funded')">{{ stateToDisplay('funded') }}</v-btn>
                <v-btn flat class="category-tab" v-bind:class="selectedTab('archived')" v-on:click="selectCategory('archived')">{{ stateToDisplay('archived') }}</v-btn>
                <!-- <v-btn flat class="category-tab float-right" v-bind:class="selectedNewInvoiceTab()" v-on:click="clickNewInvoice()">Add new invoice</v-btn> -->
              </v-flex>
            </v-layout>

            <v-layout row wrap v-show="!newInvoice">
              <v-flex xs12
              v-for="(invoice, index) in invoices"
              v-bind:key="invoice.id">
                <v-card :dark="isSelected(invoice.id)" class="invoice-card" v-on:click.native="clickInvoice(index)">
                  <v-card-title primary-title class="pt-2 pb-0">
                    <v-layout row>
                    <v-flex xs8 text-xs-left>
                      <p class="headline mb-0">{{ invoice.customer }}</p>
                    </v-flex>
                    <v-flex xs4 text-xs-right>
                      <p class="headline mb-0">${{ currencyStyle(invoice.amount) }}</p>
                      <p>Due on {{ invoice.due_date }}</p>
                    </v-flex>
                    </v-layout>
                  </v-card-title>
                  <v-card-text class="pt-1 pb-0">
                    <v-layout row>
                    <v-flex xs6 text-xs-left>Invoice #{{ invoice.number }}</v-flex>
                    <v-flex xs6 text-xs-right><p class="invoice-card-status">{{ stateToDisplay(invoice.computedState) }}</p></v-flex>
                    </v-layout>
                  </v-card-text>
                </v-card>
              </v-flex>
            </v-layout>

            <!-- <v-layout mt-4 row wrap v-show="newInvoice">
              <p class="subheading font-weight-medium">
                Your QuickBooks invoices are currently syncing automatically.
              </p>

              <p class="subheading font-weight-medium">
                You can also upload a PDF invoice or create a new one using NetZero invoice builder.
              </p>
            </v-layout>

            <v-layout row wrap v-if="newInvoice">
              <v-btn color="white">CREATE AN INVOICE</v-btn>
              <v-btn color="white">UPLOAD PDF INVOICE</v-btn>
            </v-layout> -->


          </v-container>
        </v-flex>

        <!-- <v-flex xs12 sm4 v-show="currentCategory == 'pending'">
          <v-card class="mt-2 pt-3 pl-5 pr-5 pb-4">
              <p class="mb-0 caption">12 UNPAID INVOICES</p>
              <p class="mb-0 title red--text">$15,345</p>
          </v-card>
          <v-card class="mt-0 pt-3 pl-5 pr-5 pb-4">
              <p class="mb-0 caption">3 INVOICES</p>
              <p class="mb-0 title">$1,400</p>
              <p class="mb-0 subheading">1-30 days overdue</p>
          </v-card>
          <v-card class="mt-0 pt-3 pl-5 pr-5 pb-4">
              <p class="mb-0 caption">2 INVOICES</p>
              <p class="mb-0 title">$1,243</p>
              <p class="mb-0 subheading">31-60 days overdue</p>
          </v-card>
          <v-card class="mt-0 pt-3 pl-5 pr-5 pb-4">
              <p class="mb-0 caption">2 INVOICES</p>
              <p class="mb-0 title">$1,944</p>
              <p class="mb-0 subheading">61-90 days overdue</p>
          </v-card>
          <v-card class="mt-0 pt-3 pl-5 pr-5 pb-4">
              <p class="mb-0 caption">4 INVOICES</p>
              <p class="mb-0 title">$5,867</p>
              <p class="mb-0 subheading">90+ days overdue</p>
          </v-card>
        </v-flex>

        <v-flex xs12 sm4 v-show="currentCategory == 'draft'">
          <v-card class="mt-2 pt-3 pl-5 pr-5 pb-4">
              <p class="mb-0 caption">3 INVOICES IN DRAFTS</p>
              <p class="mb-0 title">$15,345</p>
          </v-card>
        </v-flex>

        <v-flex xs12 sm4 v-show="currentCategory == 'funded'">
          <v-card class="mt-2 pt-3 pl-5 pr-5 pb-4">
              <p class="mb-0 caption">3 FUNDED INVOICES</p>
              <p class="mb-0 title teal--text">$15,345</p>
          </v-card>
        </v-flex> -->
      </v-layout>

    </v-container>

    <v-container fluid class="notification-panel" ref="notificationContainer">
      <invoice-notification ref="invoiceNotification"></invoice-notification>
    </v-container>

  </v-container>
</template>
<style src="./client_invoices.css" scoped></style>
<script src="./client_invoices.js"></script>
