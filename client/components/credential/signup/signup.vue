<template>
  <v-container fluid fill-height justify-center class="signup-panel">
    <v-layout row wrap>
      <v-container class="signup-form-panel">
        <form :action="environment.JEKYLL_URI + '/auth?exp=nzfe'" method="POST" @submit="submitSignupForm">
          <v-layout row wrap>
            <v-flex xs12 text-xs-center>
              <img class="app-logo" src="/static/img/nz-logo-colored.png" />
              <p class="headline font-weight-bold mt-5">
                Sign up and issue your invoices through NetZero.<br>
                Get paid immediately.
              </p>
            </v-flex>
          </v-layout>
          <v-layout row wrap pt-5>
            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
              <v-text-field
                name="name"
                label="Your name"
                outline
                v-model="name"
                :error-messages="nameErrors"
                @input="$v.name.$touch()"
                @blur="$v.name.$touch()"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
              <v-text-field
                name="email"
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
                name="phone"
                label="Phone"
                outline
                v-model="phone"
                :error-messages="phoneErrors"
                @input="$v.phone.$touch()"
                @blur="$v.phone.$touch()"
              ></v-text-field>
            </v-flex>

            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
              <v-text-field
                name="password"
                type="password"
                label="Password"
                outline
                v-model="password"
                :error-messages="passwordErrors"
                @input="$v.password.$touch()"
                @blur="$v.password.$touch()"
              ></v-text-field>
            </v-flex>

            <input type="hidden" name="preferred_accounting_software" value="quickbooks" />

            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
              <v-checkbox
                name="agree"
                v-model="agree"
                :error-messages="agreeErrors"
              >
              <template slot="label">
                I agree with Privacy Policy and &nbsp;<a class="normal-link" @click.stop href="https://netzero.fundthrough.com/terms-and-conditions" target="_blank">Terms & Conditions</a>.
              </template>
              </v-checkbox>
            </v-flex>

            <v-flex mt-4 xs12 sm6 offset-sm3 md4 offset-md4>
              <v-btn block color="primary" type="submit">SIGN UP</v-btn>
            </v-flex>
          </v-layout>
        </form>

      </v-container>
    </v-layout>
    <div class="signin-link">
      <p class="subheading">
        Already have a FundThrough account? <router-link to="/signin"><a class="normal-link">Sign in now</a></router-link>
      </p>
    </div>
  </v-container>
</template>
<style src="./signup.css" scoped></style>
<script src="./signup.js"></script>
