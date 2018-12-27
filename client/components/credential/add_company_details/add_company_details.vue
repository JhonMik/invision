<template>
  <v-container fluid fill-height justify-center class="add-company-details-panel">
    <v-layout row wrap>
      <v-container class="add-company-details-form-panel">
        <v-form>
          <v-layout row wrap pt-5>
            <v-flex xs12 sm6 offset-sm3 md4 offset-md4>
              <iframe class="ftx-profile-frame" :src="environment.HYDE_URI + '/settings/profile'"></iframe>
            </v-flex>

            <v-flex mt-4 xs12 sm6 offset-sm3 md4 offset-md4>
              <v-btn block color="primary" to="/add_invoice">NEXT</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-layout>
  </v-container>
</template>
<style src="./add_company_details.css" scoped></style>
<script src="./add_company_details.js"></script>