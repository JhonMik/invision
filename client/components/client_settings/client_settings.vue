<template>
  <v-container fluid class="client-settings-panel" ref="container">
    <!-- <v-container class="settings-panel">
      <iframe class="ftx-profile-frame" :src="environment.HYDE_URI + '/settings/profile'"></iframe>
      <v-btn v-on:click="clickOpenBankConnectionDialog">Open Dialog</v-btn>
    </v-container> -->

    <v-container fluid class="notification-panel" ref="notificationContainer">
    </v-container>

  </v-container>
</template>
<style src="./client_settings.css" scoped></style>
<script src="./client_settings.js"></script>
