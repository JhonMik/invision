<template>
  <v-container fluid class="admin-auth-panel" ref="container">
    <v-container fluid class="auth-panel">
      <v-form>
        <v-layout mt-3 row wrap>
          <v-flex xs12 text-xs-center>
            <p class="headline font-weight-bold">Input Password</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap pt-5>      
            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
              <v-text-field
                label="Password"
                type="password"
                outline
                v-model="password"
              ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
              <v-btn block color="primary" v-on:click="clickAuthenticate">Authenticate</v-btn>
            </v-flex>
        </v-layout>
      </v-form>
    </v-container>
  </v-container>
</template>
<!-- <style src="./admin_auth.css" scoped></style> -->
<script src="./admin_auth.js"></script>
