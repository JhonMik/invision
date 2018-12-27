<template>
  <v-container>
    <v-dialog
      v-model="dialogBankConnection" 
      :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <v-container class="dlg-view-panel">
        <iframe :src="environment.HYDE_URI + '/bank-connection'" class="ftx-bank-connection-frame"></iframe>
      </v-container>
    </v-dialog>
  </v-container>
</template>
<style src="./bank_connection_dialog.css" scoped></style>
<script src="./bank_connection_dialog.js"></script>