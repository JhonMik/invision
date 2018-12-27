<template>
  <v-container pl-5 pr-5>
    <v-layout row wrap>
      <v-flex xs7 pr-3>
      	<v-layout column>
      			<v-card class="invoice-card" v-on:click.native="clickInvoice($event)">
              <v-card-title primary-title>
                <v-layout row>
                <v-flex xs8 headline text-xs-left>Invoice Title</v-flex>
                <v-flex xs4 headline text-xs-right>$100.00</v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <v-layout row>
                <v-flex xs6 text-xs-left>John Smith</v-flex>
                <v-flex xs6 text-xs-right>Pending</v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
            <v-card dark class="invoice-card" v-on:click.native="clickInvoice($event)">
              <v-card-title primary-title>
                <v-layout row>
                <v-flex xs8 headline text-xs-left>Selected Invoice Title</v-flex>
                <v-flex xs4 headline text-xs-right>$100.00</v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <v-layout row>
                <v-flex xs6 text-xs-left>John Smith</v-flex>
                <v-flex xs6 text-xs-right>Pending</v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
            <v-card dark class="invoice-card" v-on:click.native="clickInvoice($event)">
              <v-card-title primary-title>
                <v-layout row>
                <v-flex xs8 headline text-xs-left>Selected Invoice Title</v-flex>
                <v-flex xs4 headline text-xs-right>$100.00</v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <v-layout row>
                <v-flex xs6 text-xs-left>John Smith</v-flex>
                <v-flex xs6 text-xs-right>Pending</v-flex>
                </v-layout>
              </v-card-text>
            </v-card>
            <v-card class="invoice-card" v-on:click.native="clickInvoice($event)">
              <v-card-title primary-title>
                <v-layout row>
                <v-flex xs8 headline text-xs-left>Invoice Title</v-flex>
                <v-flex xs4 headline text-xs-right>$100.00</v-flex>
                </v-layout>
              </v-card-title>
              <v-card-text>
                <v-layout row>
                <v-flex xs6 text-xs-left>John Smith</v-flex>
                <v-flex xs6 text-xs-right>Pending</v-flex>
                </v-layout>
              </v-card-text>
            </v-card>

            <v-divider class="separator"></v-divider>

            <v-layout row wrap>
              <v-flex xs6 offset-xs6>
                <v-btn flat>Upload PDF Invoice</v-btn>
              </v-flex>   
            </v-layout>
      	</v-layout>
      </v-flex>
      <v-flex xs5 pl-3>
      	<v-card class="total-invoice-card">
          <v-card-title primary-title>
            <v-layout row>
            <v-flex xs8 title text-xs-left>Total unpaid invoices</v-flex>
            <v-flex xs4 title text-xs-right>$200.00</v-flex>
            </v-layout>
          </v-card-title>
          <v-card-text>

          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style src="./payor_dashboard.css" scoped></style>
<script src="./payor_dashboard.js"></script>