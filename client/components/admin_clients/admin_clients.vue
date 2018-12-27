<template>
  <v-container fluid class="admin-clients-panel" ref="container">
    <v-container fluid class="clients-panel">
      <v-layout mt-3 row wrap>
        <p class="headline font-weight-bold">Clients</p>
      </v-layout>
      <v-layout mt-2 row wrap>
        <v-data-table
          :headers="headers"
          :items="clients"
          hide-actions
          class="clients-table elevation-1"
          :pagination.sync="pagination"
          item-key="_id"
          loading="true"
        >
          <template slot="items" slot-scope="props">
            <td v-on:click="clickClient(props.item._id)">{{ showClientName(props.item) }}</td>
            <td class="text-xs-right">{{ props.item.email }}</td>
            <td class="text-xs-right"><v-select
              :items="creditModelList"
              v-model="props.item.creditModel"
              label="Credit Model"
              @input="changedCreditModel(props.item)"
            ></v-select></td>
            <td class="text-xs-center">
              <v-btn color="success" v-on:click="clickBankingConnected(props.item.uuid)">Banking connected</v-btn>
              <v-btn color="success" v-on:click="clickBankingUnconnected(props.item.uuid)">Banking unconnected</v-btn>
              <v-btn color="success" v-on:click="clickInvoicingReminded(props.item.uuid)">Invoicing reminded</v-btn>
              <v-btn color="success" v-on:click="exportClientData(props.item.uuid)">Export Client Data</v-btn>
            </td>
          </template>
        </v-data-table>
      </v-layout>
    </v-container>
    <v-container fluid class="notification-panel" ref="notificationContainer">
    </v-container>
  </v-container>
</template>
<style src="./admin_clients.css" scoped></style>
<script src="./admin_clients.js"></script>
