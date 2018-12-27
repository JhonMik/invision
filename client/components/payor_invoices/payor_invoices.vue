<template>
  <v-container fluid class="payor-invoices-panel" ref="container">
    <v-container fluid class="invoices-panel">
      <v-layout row wrap>
        <v-flex xs12 sm10>
          <v-container class="invoices-grid">
            <v-layout row wrap>
              <v-flex class="category">
                <v-btn flat class="category-tab" v-bind:class="selectedTab('all')" v-on:click="selectCategory('all')">All</v-btn>
                <v-btn flat class="category-tab" v-bind:class="selectedTab('unpaid')" v-on:click="selectCategory('unpaid')">Unpaid</v-btn>
                <v-btn flat class="category-tab" v-bind:class="selectedTab('verified')" v-on:click="selectCategory('verified')">Verified</v-btn>
                <v-btn flat class="category-tab" v-bind:class="selectedTab('paid')" v-on:click="selectCategory('paid')">Paid</v-btn>
                <v-btn flat class="category-tab" v-bind:class="selectedTab('rejected')" v-on:click="selectCategory('rejected')">Rejected</v-btn>
              </v-flex>
            </v-layout>

            <v-layout row wrap>
              <v-flex xs12 sm6 md4
              v-for="invoice in invoices"
              v-bind:key="invoice.id">
                <v-card class="invoice-card text-xs-center" v-on:click.native="clickInvoice(invoice.id)">
                  <pdf src="https://cdn.mozilla.net/pdfjs/tracemonkey.pdf"></pdf>
                  <v-btn to="/payor/invoices_review">View invoice</v-btn>
                </v-card>
              </v-flex>
            </v-layout>

          </v-container>
        </v-flex>
      </v-layout>

    </v-container>

    <v-container fluid class="notification-panel" ref="notificationContainer">
    </v-container>

  </v-container>
</template>
<style src="./payor_invoices.css" scoped></style>
<script src="./payor_invoices.js"></script>