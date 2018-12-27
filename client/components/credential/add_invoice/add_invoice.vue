<template>
  <v-container fluid fill-height justify-center class="add-invoice-panel">
    <v-layout row wrap>
      <v-container class="add-invoice-form-panel">
        <v-form>
          <v-layout row wrap>
            <v-flex xs12 text-xs-center>
              <p class="headline font-weight-bold">2. Add an invoice</p>
              <p class="subheading font-weight-medium">Your invoices will be pulled into NetZero account automatically,<br>so you can fund them faster.</p>
            </v-flex>
            <v-flex mt-4 xs12 sm6 offset-sm3 md4 offset-md4 text-xs-center>
              <v-btn color="primary">Connect to QUICKBOOKS</v-btn>
            </v-flex>
          </v-layout>
          <v-layout row wrap pt-5>
            <v-flex xs12 text-xs-center>
              <p class="subheading font-weight-medium">or upload a PDF invoice</p>
            </v-flex>
            <v-flex mt-4 xs12 sm6 offset-sm3 md4 offset-md4 text-xs-center>
              <v-btn>Upload PDF</v-btn>
            </v-flex>
          </v-layout>
        </v-form>
      </v-container>
    </v-layout>

    <div class="add-invoice-bottom">
      <v-layout row wrap>
        <v-flex xs6 text-xs-left>
          <v-btn to="/add_company_details">GO BACK</v-btn>  
        </v-flex>
        <v-flex xs6 text-xs-right>
          <v-btn to="/connect_bank_account">SKIP THIS STEP</v-btn>  
        </v-flex>
      </v-layout>
    </div>
  </v-container>
</template>
<style src="./add_invoice.css" scoped></style>
