<template>
  <v-container fluid fill-height justify-center class="finish-connection-panel">
    <v-layout row wrap>
        <v-flex xs12 sm-6 offset-sm3 md6 offset-md3 text-xs-center>
            <p class="headline font-weight-bold mt-5">
                Congratulations! You have successfuly fund your first invoce.
            </p>
            <p class="subheading" mt-2 mb-5>
               $12,345.00 will be sent directly and is expected to arrive in your bank account today.
            </p>
            <v-btn color="primary" v-on:click="gotoDashboard">Continue to dashboard</v-btn>
        </v-flex>
    </v-layout>
	</v-container>
</template>
<style src="./finish_connection.css" scoped></style>
<script src="./finish_connection.js"></script>
