<template>
  <v-container fluid class="client-dashboard-panel" ref="container">
    <v-layout mt-3 row wrap>
      <p class="headline font-weight-bold">Dashboard</p>
    </v-layout>
    <v-layout row wrap>
      <v-card class="overall">
        <v-layout row wrap>
          <v-flex xs12 sm4 mt-3 caption>
            {{ invoicesSummaryData.unpaidInvoicesCount }} UNPAID INVOICES
            <p class="headline font-weight-bold mb-0">${{ currencyStyle(invoicesSummaryData.unpaidInvoicesTotal) }}</p>
          </v-flex>
          <v-flex xs12 sm4 mt-3 caption>
            AVERAGE DAYS PAST DUE
            <p class="headline font-weight-bold mb-0">{{ invoicesSummaryData.averageDaysPastDue }}</p>
          </v-flex>
          <v-flex xs12 sm4 mt-3 caption>
            {{ invoicesSummaryData.fundedInvoicesCount }} FUNDED INVOICES
            <p class="headline font-weight-bold mb-0 teal--text">${{ currencyStyle(invoicesSummaryData.fundedInvoicesTotal) }}</p>
          </v-flex>
        </v-layout>
      </v-card>
    </v-layout>

    <v-layout row wrap>
      <v-flex xs12 sm6 md3>
        <v-card class="by-time">
          <p class="caption mb-0">{{ invoicesSummaryData.overdue0130Count }} INVOICES</p>
          <p class="headline font-weight-bold red--text text--darken-3 mb-0">${{ currencyStyle(invoicesSummaryData.overdue0130Total) }}</p>
          <p class="subheading mb-0">1-30 days overdue</p>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-card class="by-time">
          <p class="caption mb-0">{{ invoicesSummaryData.overdue3160Count }} INVOICES</p>
          <p class="headline font-weight-bold red--text text--darken-3 mb-0">${{ currencyStyle(invoicesSummaryData.overdue3160Total) }}</p>
          <p class="subheading mb-0">31-60 days overdue</p>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-card class="by-time">
          <p class="caption mb-0">{{ invoicesSummaryData.overdue6190Count }} INVOICES</p>
          <p class="headline font-weight-bold red--text text--darken-3 mb-0">${{ currencyStyle(invoicesSummaryData.overdue6190Total) }}</p>
          <p class="subheading mb-0">61-90 days overdue</p>
        </v-card>
      </v-flex>
      <v-flex xs12 sm6 md3>
        <v-card class="by-time">
          <p class="caption mb-0">{{ invoicesSummaryData.overdue90PlusCount }} INVOICES</p>
          <p class="headline font-weight-bold red--text text--darken-3 mb-0">${{ currencyStyle(invoicesSummaryData.overdue90PlusTotal) }}</p>
          <p class="subheading mb-0">90+ days overdue</p>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout mt-5 column wrap>
      <p class="headline font-weight-bold">Recently Funded by FundThrough</p>
      <v-card class="recent-fund">
        <table class="recent-fund-table">
          <thead>
            <tr>
              <td class="caption">CUSTOMER</td>
              <td class="caption">INVOICE</td>
              <td class="caption">DATE FUNDED</td>
              <td class="caption" colspan="3">FUNDED AMOUNT</td>
              <td class="caption" colspan="2">FUNDED FEES</td>
            </tr>
          </thead>
          <tbody>
            <tr
            v-for="(invoice, index) in fundedInvoicesData"
            v-bind:key="index">
              <td class="subheading">{{ invoice.customer }}</td>
              <td class="subheading">#{{ invoice.invoice }}</td>
              <td class="subheading">{{ dateISO2Local(invoice.dateFunded) }}</td>
              <td class="subheading invoice-table-amount-symbol">$</td>
              <td class="subheading invoice-table-amount-number">{{ currencyStyle(invoice.fundedAmount) }}</td>
              <td class="subheading invoice-table-amount-gap"></td>
              <td class="subheading invoice-table-amount-symbol">$</td>
              <td class="subheading invoice-table-amount-number">{{ currencyStyle(invoice.fundingFees) }}</td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </v-layout>

    <v-layout mt-5 column wrap>
      <p class="headline font-weight-bold">Recently Paid by FundThrough</p>
      <v-card class="recent-paid">
        <table class="recent-paid-table">
          <thead>
            <tr>
              <td class="caption">CUSTOMER</td>
              <td class="caption">INVOICE</td>
              <td class="caption">DATE PAID</td>
              <td class="caption" colspan="3">PAID AMOUNT</td>
              <td class="caption">DAYS TAKEN TO PAY</td>
            </tr>
          </thead>
          <tbody>
            <tr
            v-for="(invoice, index) in paidInvoicesData"
            v-bind:key="index">
              <td class="subheading">{{ invoice.customer }}</td>
              <td class="subheading">#{{ invoice.invoice }}</td>
              <td class="subheading">{{ dateISO2Local(invoice.datePaid) }}</td>
              <td class="subheading invoice-table-amount-symbol">$</td>
              <td class="subheading invoice-table-amount-number">{{ currencyStyle(invoice.paidAmount) }}</td>
              <td class="subheading invoice-table-amount-gap"></td>
              <td class="subheading">{{ invoice.daysToPay }}</td>
            </tr>
          </tbody>
        </table>
      </v-card>
    </v-layout>
  </v-container>
</template>
<style src="./client_dashboard.css" scoped></style>
<script src="./client_dashboard.js"></script>