<template>
  <v-container fluid class="admin-payor-panel" ref="container">
    <v-container fluid class="payor-panel">
      <v-layout mt-3 row wrap>
        <p class="headline font-weight-bold">Invoices</p>
      </v-layout>
      <v-layout mt-2 row wrap>
        <v-data-table
          :headers="headers"
          :items="invoices"
          hide-actions
          class="invoices-table elevation-1"
          :pagination.sync="pagination"
          item-key="id"
          loading="true"
        >
          <template slot="items" slot-scope="props">
            <td >{{ customer.name }}</td>
            <td class="text-xs-right">{{ customer.email }}</td>
            <td class="text-xs-right">{{ props.item.status }}</td>
            <td class="text-xs-right">{{ props.item.importedData.amount }}</td>
            <td class="text-xs-center" v-if="props.item.status === 'invoice_verification_requested'">
              <v-btn color="success" v-on:click="clickRemindInvoice(props.item.id)">Reminder</v-btn>
            </td>
           </template>
        </v-data-table>
      </v-layout>
    </v-container>
    <v-container fluid class="notification-panel" ref="notificationContainer">
    </v-container>
  </v-container>
</template>
<style src="./admin_payor.css" scoped></style>
<script src="./admin_payor.js"></script>
