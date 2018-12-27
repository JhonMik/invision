<template>
  <v-container fluid class="payor-invoice-review-panel" ref="container">
    <v-container fluid class="invoices-panel" v-show="!showNotification">
      <v-layout row wrap class="invoice-carousel-panel">
        <v-carousel light hide-delimiters interval="600000" class="invoice-carousel">
          <v-carousel-item
            v-for="invoice in invoices"
            v-bind:key="invoice.id"
          >
            <v-card class="invoice-card">
              <pdf src="https://cdn.mozilla.net/pdfjs/tracemonkey.pdf"></pdf>
            </v-card>
          </v-carousel-item>
        </v-carousel>
      </v-layout>

      <v-bottom-nav fixed class="bottom-bar">
        <v-flex xs12 class="text-xs-right">
          <v-btn dark color="white" v-on:click="clickReject">REJECT</v-btn>
          <v-btn dark raised v-on:click="clickConfirm">CONFIRM INVOICE</v-btn>
        </v-flex>
      </v-bottom-nav>
    </v-container>
    <v-container fluid class="notification-panel" ref="notificationContainer">
    </v-container>
  </v-container>
</template>
<style src="./payor_invoice_review.css" scoped></style>
<script src="./payor_invoice_review.js"></script>