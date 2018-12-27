<template>
  <v-container fluid class="payor-invoice-panel" ref="container">
    <v-container fluid class="invoice-panel">
      <v-card>
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs4 text-xs-center>
            <p class="title mb-0">Invoice #{{invoice.id}}</p>
            <!-- <p class="body-2 view-invoice-status">{{stateToDisplay(invoice.computedState)}}</p> -->
          </v-flex>
          <v-flex xs4 text-xs-center>
            <p class="caption mb-0 grey--text">PAYMENT DUE</p>
            <p class="title mb-0">{{invoice.due_date}}</p>
          </v-flex>
          <v-flex xs4 text-xs-center>
            <p class="caption mb-0 grey--text">AMOUNT DUE</p>
            <p class="title mb-0">${{invoice.amount}}</p>
          </v-flex>
        </v-layout>
      
        <v-layout mt-4 row wrap class="invoice-company-info">
          <v-flex xs4 text-xs-center>
            <p class="caption mb-0 grey--text"> CUSTOMER NAME</p>
            <p class="subheading">{{invoice.customer}}</p>
          </v-flex>
          <v-flex xs4 text-xs-center>
            <p class="caption mb-0 grey--text"> CUSTOMER COMPANY</p>
            <p class="subheading">{{invoice.customer}}</p>
          </v-flex>
          <v-flex xs4 text-xs-center>
            <p class="caption mb-0 grey--text"> CUSTOMER EMAIL</p>
            <p class="subheading">{{invoice.email_address_opt}}</p>
          </v-flex>
        </v-layout>
      </v-card>
      <v-footer class="bottom-bar" app>
        <v-flex xs12 class="text-xs-right">
          <v-btn class="white--text" flat v-on:click="clickReject" v-if="showRejectAndConfirm">REJECT</v-btn>
          <v-btn v-on:click="clickConfirm" v-if="showRejectAndConfirm">CONFIRM INVOICE</v-btn>
        </v-flex>
      </v-footer>
    </v-container>
    <v-container fluid class="notification-panel" ref="notificationContainer">
      <invoice-notification ref="invoiceNotification"></invoice-notification>
    </v-container>
  </v-container>
</template>
<style src="./payor_invoice.css" scoped></style>
<script src="./payor_invoice.js"></script>
