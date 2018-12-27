<template>
  <v-app>
    <client-sidebar v-if="!hideSidebar && isClient" ref="sidebar">
    </client-sidebar>
    <payor-sidebar v-if="!hideSidebar && isPayor" ref="sidebar">
    </payor-sidebar>
    <admin-sidebar v-if="isAdmin && showAdminSidebar" ref="sidebar">
    </admin-sidebar>
    <v-toolbar clipped-left fixed app v-if="!hideTopbar">
      <v-btn flat icon class="hidden-lg-and-up" v-show="!hideShowSidebarButton" v-on:click="showSidebar"><v-icon>menu</v-icon></v-btn>
      <img class="app-logo" src="/static/img/nz-logo-colored.png" />
    </v-toolbar>
    <v-content>
      <v-snackbar
        top
        v-model="showNotify"
        :color="notifyColor"
      >
        {{ notifyText }}
      </v-snackbar>
      <loading
        :event-bus="globalEventBus"
        event-show="show-full-loading"
        event-hide="hide-full-loading"
        :label="fullLoadingLabel">
      </loading>
      <router-view/>
    </v-content>
    <v-footer class="px-4 theme--dark " app v-if="!isPayor">
      <span class="white--text">&copy; {{ new Date().getFullYear() }} NZFE</span>
    </v-footer>
  </v-app>
</template>
<style src="./app.css"></style>
<script src="./app.js"></script>
