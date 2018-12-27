<template>
  <v-container fluid fill-height justify-center class="connect-qb-panel">
    <v-layout row wrap>
      <v-container class="connect-qb-form-panel">
        <v-form>
          <v-layout row wrap>
            <v-flex xs12 text-xs-center>
              <img class="software-logo" src="/static/img/qb.png" />
              <p class="headline font-weight-bold mt-5">
                Connect your QuickBooks account
              </p>
              <p class="subheading font-weight-bold mt-2">
                NetZero will be able to access your QuickBooks data, but will not be able to see your Intuit account password. You can revoke access anytime under 'App Center/ Manage My Apps.’
              </p>
            </v-flex>
          </v-layout>
          <v-layout row wrap pt-5>
            <v-flex xs12 sm6 offset-sm3 md2 offset-md5>
              <v-text-field
                label="UserName"
                outline
                v-model="username"
                :error-messages="usernameErrors"
                @input="$v.username.$touch()"
                @blur="$v.username.$touch()"
                v-bind:class="{'is-invalid': attemptSubmit && usernameErrors}"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 offset-sm3 md2 offset-md5>
              <v-text-field
                type="password"
                label="Password"
                outline
                v-model="password"
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>
            </v-flex>

            <v-flex mt-4 xs12 sm6 offset-sm3 md2 offset-md5>
              <v-btn block color="primary" v-on:click="connectQb">Connect to QuickBooks</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-layout>
  </v-container>
</template>
<style src="./connect_qb_account.css" scoped></style>
<script src="./connect_qb_account.js"></script>
