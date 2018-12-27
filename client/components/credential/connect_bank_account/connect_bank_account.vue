<template>
  <v-container fluid fill-height justify-center class="connect-bank-account-panel">
    <v-layout row wrap>
      <v-container class="connect-bank-account-form-panel">
          <v-layout row wrap>
            <v-flex xs12 text-xs-center>
              <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
                <iframe class="ftx-payments-frame" :src="environment.HYDE_URI + '/settings/payments'"></iframe>
              </v-flex>
            </v-flex>
          </v-layout>
      </v-container>
    </v-layout>

    <div class="connect-bank-account-bottom">
      <v-layout row wrap>
        <v-flex xs6 text-xs-left>
          <v-btn to="/add_invoice">GO BACK</v-btn>  
        </v-flex>
        <v-flex xs6 text-xs-right>
          <v-btn to="/direct_deposit">SKIP THIS STEP</v-btn>  
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>
<style src="./connect_bank_account.css" scoped></style>
<script src="./connect_bank_account.js"></script>
