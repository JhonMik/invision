<template>
  <v-container fluid fill-height justify-center class="direct-deposit-panel">
    <v-layout row wrap>
      <v-container class="direct-deposit-form-panel">
          <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
              <iframe class="ftx-direct-deposit-frame" :src="environment.HYDE_URI + '/settings/direct_deposit'"></iframe>
            </v-flex>
            <v-flex mt-4 xs12 sm6 offset-sm3 md4 offset-md4>
              <v-btn block color="primary">Connect</v-btn>
            </v-flex>
          </v-layout>
      </v-container>
    </v-layout>

    <div class="direct-deposit-bottom">
      <v-layout row wrap>
        <v-flex xs6 text-xs-left>
          <v-btn to="/connect_bank_account">GO BACK</v-btn>  
        </v-flex>
        <v-flex xs6 text-xs-right>
          <v-btn>SKIP THIS STEP</v-btn>  
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>
<style src="./direct_deposit.css" scoped></style>
<script src="./direct_deposit.js"></script>
