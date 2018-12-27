<template>
  <v-navigation-drawer width="250" dark clipped fixed app v-model="show" class="sidebar">
    <v-list class="sidebar-list">
      <v-list-tile class="sidebar-item" active-class="primary--text sidebar-item-active" to="/payor/dashboard">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
      <v-list-tile class="sidebar-item" active-class="primary--text sidebar-item-active" to="/payor/invoices">
        <v-list-tile-action>
          <v-icon>description</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Invoices</v-list-tile-title>
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
<style src="./payor_sidebar.css"></style>
<script src="./payor_sidebar.js"></script>
