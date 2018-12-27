<template>
  <v-container fluid fill-height justify-center class="connect-software-panel">
    <v-layout row wrap>
      <v-container class="connect-software-form-panel" grid-list-md>
        <v-form>
          <v-layout row wrap>
            <v-flex xs12 text-xs-center>
              <p class="headline font-weight-bold">Connect your accounting software</p>
              <p class="subheading font-weight-medium">Where should we pull your invoices from?</p>
            </v-flex>
          </v-layout>
          <v-layout row wrap class="softwares">
            <v-flex d-flex xs12 sm6 md3>
              <v-card class="logo-card qb-logo" height="100px" width="140px" :ripple="true" v-on:click="onClickLogo('qb')">
                <img class="software-logo-img" src="/static/img/qb.png" />
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md3>
              <v-card class="logo-card freshbook-logo" height="100px" width="140px"  :ripple="true">
                <img class="software-logo-img" src="/static/img/freshbooks.png" />
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md3>
              <v-card class="logo-card xero-logo" height="100px" width="140px" :ripple="true">
                <img class="software-logo-img" src="/static/img/xero.png" />
              </v-card>
            </v-flex>
            <v-flex d-flex xs12 sm6 md3>
              <v-card class="logo-card wave-logo" height="100px" width="140px" :ripple="true">
                <img class="software-logo-img" src="/static/img/wave.png" />
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout row wrap pt-5>
            <v-flex xs12 text-xs-center>
              <p class="font-weight-medium">Your data is secured with the highest available standards.<br />
                Your data is however shared with any third party.</p>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-layout>
  </v-container>
</template>
<style src="./connect_software_account.css" scoped></style>
<script src="./connect_software_account.js"></script>
