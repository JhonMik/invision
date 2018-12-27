<template>
  <v-container fluid fill-height justify-center class="connecting-panel">
    <v-layout row wrap>
			<v-flex xs12 text-xs-center>
				<img class="software-logo" src="/static/img/qb.png" />
				<p class="headline font-weight-bold mt-5">
					Connecting to QuickBooks
				</p>
				<p class="subheading mt-2 mb-5">
					Please wait while we import your QuickBooks invoices into NetZero.
					<br />
					If you don’t want to wait you’re free to leave this page
					<br />
					and we’ll email you when import completed.
				</p>
				<v-progress-circular :size="50" indeterminate color="primary"></v-progress-circular>
			</v-flex>
    </v-layout>
	</v-container>
</template>
<style src="./connecting_qb_account.css" scoped></style>
<script src="./connecting_qb_account.js"></script>
