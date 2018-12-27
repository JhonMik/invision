<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-card class="card-form elevation-12" width="400">
        <h1 class="app-title">NZFE</h1>
        <v-layout align-center justify-center>
          <v-btn to="/signin">Sign in</v-btn>
          <v-btn to="/client/dashboard">Client</v-btn>
          <v-btn to="/payor/invoices">Payor Invoices</v-btn>
        </v-layout>
      </v-card>
    </v-layout>
  </v-container>
</template>
<style src="./home.css" scoped></style>
<script src="./home.js"></script>
