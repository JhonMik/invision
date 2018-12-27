<template>
  <v-container fluid fill-height justify-center class="connect-qb-panel">
    <v-layout row wrap>
      <v-container class="connect-qb-form-panel">
        <v-form>
            <v-layout row wrap>
                <v-flex xs12 text-xs-center>
                <p class="headline font-weight-bold">
                    Almost done!
                </p>
                <p class="subheading font-weight-bold mt-2">
                    Your message is ready to be sent.<br />
                    Before we send it, tell us where to deposit your money.
                </p>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex d-flex xs12 sm6 offset-sm3 md2 offset-md5>
                    <v-container fluid fill-height class="country-options">
                        <v-layout row wrap>
                            <v-radio-group row>
                                <p-radio class="p-default p-round p-fill" name="radio1">CANADA</p-radio>
                                <p-radio class="p-default p-round p-fill" name="radio1">USA</p-radio>
                            </v-radio-group>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 sm6 offset-sm3 md2 offset-md5>
                    <v-text-field
                        label="Bank name"
                        outline
                        v-model="bankname"
                        :error-messages="banknameErrors"
                        @input="$v.bankname.$touch()"
                        @blur="$v.bankname.$touch()"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3 md2 offset-md5>
                    <v-text-field
                        label="Transit number"
                        outline
                        v-model="transitnumber"
                        :error-messages="transitnumberErrors"
                        @input="$v.transitnumber.$touch()"
                        @blur="$v.transitnumber.$touch()"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3 md2 offset-md5>
                    <v-text-field
                        label="Institution number"
                        outline
                        v-model="institutionnumber"
                        :error-messages="institutionnumberErrors"
                        @input="$v.institutionnumber.$touch()"
                        @blur="$v.institutionnumber.$touch()"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3 md2 offset-md5>
                    <v-text-field
                        label="Account number"
                        outline
                        v-model="accountnumber"
                        :error-messages="accountnumberErrors"
                        @input="$v.accountnumber.$touch()"
                        @blur="$v.accountnumber.$touch()"
                    ></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3 md2 offset-md5>
                    <a class="subheading normal-link" href="https://express.fundthrough.com/password-lost">Where Can I Find These Numbers?</a>
                </v-flex>
                <v-flex mt-3 xs12 sm6 offset-sm3 md2 offset-md5>
                    <v-btn block color="primary" v-on:click="onClick">Continue</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
      </v-container>
    </v-layout>
  </v-container>
</template>
<style src="./input_bank_info.css" scoped></style>
<style src="../../../node_modules/pretty-checkbox/dist/pretty-checkbox.min.css"></style>
<script src="./input_bank_info.js"></script>
