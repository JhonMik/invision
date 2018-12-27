<template>
  <v-container fluid class="admin-payors-panel" ref="container">
    <v-container fluid class="payors-panel">
      <v-layout mt-3 row wrap>
        <p class="headline font-weight-bold">Payors</p>
      </v-layout>
      <v-layout mt-2 row wrap>
        <v-data-table
          :headers="headers"
          :items="payors"
          hide-actions
          class="payors-table elevation-1"
          :pagination.sync="pagination"
          item-key="id"
          loading="true"
        >
          <template slot="items" slot-scope="props">
            <td v-on:click="clickPayor(props.item.id)">{{ props.item.name }}</td>
            <td class="text-xs-right">{{ props.item.email }} </td>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
    <v-container fluid class="notification-panel" ref="notificationContainer">
    </v-container>
  </v-container>
</template>
<style src="./admin_payors.css" scoped></style>
<script src="./admin_payors.js"></script>
