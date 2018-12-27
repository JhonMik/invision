<template>
  <v-container fluid fill-height justify-center class="signin-bank-panel">
    <v-layout row wrap>
      <v-container class="signin-bank-form-panel">
        <v-form>
          <v-layout row wrap>
            <v-flex xs12 text-xs-center>
              <p class="headline font-weight-bold">Sign in Scotiabank</p>
              <p class="subheading font-weight-medium"></p>
            </v-flex>
          </v-layout>
          <v-layout row wrap pt-5>
            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
              <v-text-field
                label="Username or card number"
                outline
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
              <v-text-field
                type="password"
                label="Password"
                outline
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
              <router-link to="/"><a class="subheading normal-link">Forgot Password?</a></router-link>
            </v-flex>

            <v-flex mt-4 xs12 sm6 offset-sm3 md4 offset-md4>
              <v-btn block color="primary" to="/payor/dashboard">LOG IN</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-layout>

    <div class="signin-bank-bottom">
      <v-btn>GO BACK</v-btn>
    </div>
  </v-container>
</template>
<style src="./signin_bank.css" scoped></style>
<!-- <script src="./signin.js"></script> -->
