<template>
  <v-container fluid class="client-customers-panel" ref="container">
    <v-layout mt-3 row wrap>
      <p class="headline font-weight-bold">Customers</p>
    </v-layout>

    <v-layout mt-2 column wrap>
      <v-card class="customers-card">
        <table class="customers-table">
          <thead>
            <tr>
              <!-- <td class="caption">NAME</td> -->
              <td class="caption">COMPANY</td>
              <td class="caption">EMAIL</td>
              <td class="caption">UNPAID INVOICES</td>
              <td class="caption" colspan="3">UNPAID AMOUNT</td>
            </tr>
          </thead>
          <tbody>
            <tr
            v-for="(customer, index) in customers"
            v-bind:key="customer.id">
              <!-- <td class="subheading">{{ customer.contactName }}</td> -->
              <td class="subheading">{{ customer.companyName }}</td>
              <td class="subheading">{{ customer.contactEmail }}</td>
              <td class="subheading">{{ customer.unpaidInvoices }}</td>
              <td class="subheading customers-table-amount-symbol">$</td>
              <td class="subheading customers-table-amount-number">{{ currencyStyle(customer.unpaidAmount)  }}</td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </v-layout>


  </v-container>
</template>
<style src="./client_customers.css" scoped></style>
<script src="./client_customers.js"></script>
