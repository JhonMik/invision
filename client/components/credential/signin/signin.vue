<template>
  <v-container fluid fill-height justify-center class="signin-panel">
    <v-layout row wrap>
      <v-container class="signin-form-panel">
        <v-form>
          <v-layout row wrap>
            <v-flex xs12 text-xs-center>
              <img class="app-logo" src="/static/img/nz-logo-colored.png" />
              <p class="headline font-weight-bold mt-5">
                Sign in and issue your invoices through NetZero.<br>
                Get paid immediately.
              </p>
            </v-flex>
          </v-layout>
          <v-layout row wrap pt-5>
            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
              <v-text-field
                label="Email"
                outline
                v-model="email"
                :error-messages="emailErrors"
                @input="$v.email.$touch()"
                @blur="$v.email.$touch()"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
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

            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
              <a class="subheading normal-link" href="https://express.fundthrough.com/password-lost">Forgot Password?</a>
            </v-flex>

            <v-flex mt-4 xs12 sm6 offset-sm3 md4 offset-md4>
              <v-btn block color="primary" v-on:click="clickSignin">SIGN IN</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-layout>

    <div class="signup-link">
      <p class="subheading">
        Don't have an account yet? <router-link to="/signup"><a class="normal-link">Sign up now</a></router-link>
      </p>
    </div>
  </v-container>
</template>
<style src="./signin.css" scoped></style>
<script src="./signin.js"></script>
