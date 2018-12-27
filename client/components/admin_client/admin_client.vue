<template>
  <v-container fluid class="admin-client-panel" ref="container">
    <v-container fluid class="client-panel">
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
            <td>{{ props.item.customer }}</td>
            <td>{{ props.item.email_address_opt }}</td>
            <td class="text-xs-left"> {{ props.item.status }} </td>
            <td class="text-xs-right">{{ props.item.amount }}</td>
            <td class="text-xs-center" v-if="props.item.status !== 'invoice_creation_pending'">
              <v-btn color="success" v-on:click="clickApproveFunding(props.item.id)">Approve for funding</v-btn>
              <v-btn color="success" v-on:click="clickRejectInvoice(props.item.id)">Reject</v-btn>
            </td>
           </template>
        </v-data-table>
      </v-layout>
    </v-container>
    <v-container fluid class="notification-panel" ref="notificationContainer">
    </v-container>
  </v-container>
</template>
<style src="./admin_client.css" scoped></style>
<script src="./admin_client.js"></script>
