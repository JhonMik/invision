<template>
  <v-navigation-drawer width="250" dark clipped fixed app v-model="show" class="sidebar">
    <v-list class="sidebar-list">
      <v-list-tile class="sidebar-item" active-class="primary--text sidebar-item-active" to="/client/dashboard">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="sidebar-item" active-class="primary--text sidebar-item-active" to="/client/invoices">
        <v-list-tile-action>
          <v-icon>description</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Invoices</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="sidebar-item" active-class="primary--text sidebar-item-active" to="/client/customers">
        <v-list-tile-action>
          <v-icon>contacts</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Customers</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="sidebar-item" active-class="primary--text sidebar-item-active" href="https://express.fundthrough.com/settings/banking-credentials-update">
        <v-list-tile-action>
          <v-icon>settings</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Settings</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="sidebar-item" active-class="primary--text sidebar-item-active" @click="clickLogout()">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Log out</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>
<style src="./client_sidebar.css"></style>
<script src="./client_sidebar.js"></script>
