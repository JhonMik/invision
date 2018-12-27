<template>
  <v-container>
    <v-dialog
      v-model="dialogViewInvoice"
      persistent :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <v-container class="dlg-view-panel">
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs6>
            <p class="title mb-0">Invoice #{{invoice.number}}</p>
            <p class="body-2 view-invoice-status">{{!invoice.email_address_opt ? 'Missing customer email' : stateToDisplay(invoice.computedState)}}</p>
          </v-flex>
          <v-flex xs4>
            <p class="caption mb-0 grey--text">PAYMENT DUE</p>
            <p class="title mb-0">{{invoice.due_date}}</p>
          </v-flex>
          <v-flex xs2>
            <p class="caption mb-0 grey--text">AMOUNT DUE</p>
            <p class="title mb-0">${{currencyStyle(invoice.amount)}}</p>
          </v-flex>
        </v-layout>

        <v-layout mt-4 row wrap class="invoice-company-info">
          <v-flex xs4 text-xs-center pl-2 pr-2>
            <p class="caption mb-0 grey--text"> CUSTOMER NAME</p>
            <p class="subheading invoice-company-info-value">{{invoice.customer}}</p>
          </v-flex>
          <v-flex xs4 text-xs-center pl-2 pr-2>
            <p class="caption mb-0 grey--text"> CUSTOMER COMPANY</p>
            <p class="subheading invoice-company-info-value">{{invoice.customer}}</p>
          </v-flex>
          <v-flex xs4 text-xs-center pl-2 pr-2>
            <p class="caption mb-0 grey--text"> CUSTOMER EMAIL</p>
            <p class="subheading invoice-company-info-value">{{invoice.email_address_opt}}</p>
          </v-flex>
        </v-layout>


        <v-layout row wrap class="vertical-line-group">
          <v-flex xs4>

          </v-flex>
          <v-flex xs4 class="vertical-line">
            &nbsp;
          </v-flex>
          <v-flex xs4>

          </v-flex>
        </v-layout>

        <v-layout pl-5 row wrap class="view-invoice-history">
          <v-flex xs1>
            <div class="view-invoice-history-line-group">
              <div class="view-invoice-horizontal-line"
              v-for="(invoiceEvent) in invoice.events"
              v-bind:key="invoiceEvent.timestamp">
                <div class="view-invoice-history-line-icon-wrapper">
                  <v-icon color="teal" size=12 class="view-invoice-history-line-icon">add_circle</v-icon>
                </div>
              </div>
            </div>
          </v-flex>
          <v-flex pt-3 pb-3 xs11>
            <v-layout column wrap>
              <v-flex
              v-for="(invoiceEvent) in invoice.events"
              v-bind:key="invoiceEvent.timestamp">
                <div class="view-invoice-history-item">
                  <p class="caption mb-0 grey--text">{{ eventToDisplay(invoiceEvent.descriptor) }}</p>
                  <p class="subheading mb-0">{{ dateISO2Local(invoiceEvent.timestamp) }}</p>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>

        <v-layout mt-3 pt-2 pb-2 class="dlg-button-area" row wrap>
          <v-flex xs4>
            <v-btn flat v-on:click.native="dialogViewInvoice = false">CLOSE</v-btn>
          </v-flex>
          <v-flex xs4 text-xs-center>
            <v-btn color="primary" v-if="showFundButton" v-on:click.native="clickPayorInform">INFORM PAYOR</v-btn>
          </v-flex>
          <v-flex xs4 text-xs-right>
            <v-btn flat v-on:click.native="clickPreviewInvoice" v-show="false">PREVIEW INVOICE</v-btn>
            <v-btn color="primary" v-if="showFundButton" v-on:click.native="clickFund">FUND</v-btn>
          </v-flex>
        </v-layout>

      </v-container>
    </v-dialog>

    <v-dialog
      v-model="dialogPreviewInvoice"
      persistent :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <v-container class="dlg-view-panel">
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs12>
            <v-card class="invoice-card text-xs-center">
              <!-- <pdf src="https://cdn.mozilla.net/pdfjs/tracemonkey.pdf"></pdf> -->
              <v-btn to="/payor/invoices_review">View invoice</v-btn>
            </v-card>
          </v-flex>
        </v-layout>

        <v-layout mt-3 pt-2 pb-2 class="dlg-button-area" row wrap>
          <v-flex xs6>
            <v-btn flat v-on:click.native="dialogPreviewInvoice = false">CLOSE</v-btn>
          </v-flex>
          <v-flex xs6 text-xs-right>

          </v-flex>
        </v-layout>

      </v-container>
    </v-dialog>

    <v-dialog
      v-model="dialogViewFundedInvoice"
      persistent :overlay="false"
      max-width="600px"
      transition="dialog-transition"
    >
      <v-container class="dlg-view-panel">
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs6>
            <p class="title mb-0">Invoice #134</p>
            <p class="body-2 view-invoice-status">FUNDED</p>
          </v-flex>
          <v-flex xs3>
            <p class="title mb-0">July 13, 2018</p>
            <p>Payment due</p>
          </v-flex>
          <v-flex xs3>
            <p class="title text-xs-right mb-0">$12,345</p>
            <p class="text-xs-right">Amount due</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap pl-4 pr-4 class="mt-5">
          <v-flex xs6>
            <p class="subheading font-weight-medium mb-0">John Smith</p>
            <p class="caption">PAYOR NAME</p>

            <p class="subheading font-weight-medium mb-0">ABC Company</p>
            <p class="caption">PAYOR COMPANY</p>

            <p class="subheading font-weight-medium mb-0">john@abc.com</p>
            <p class="caption">PAYOR NAME</p>
          </v-flex>

          <v-flex pl-3 xs6 class="dlg-right-panel">
            <p class="subheading font-weight-medium mb-0">June 28, 2018 at 1:20PM EDT</p>
            <p class="caption">INVOICE CREATED</p>

            <p class="subheading font-weight-medium mb-0">June 28, 2018 at 1:20PM EDT</p>
            <p class="caption">INVOICE SENT</p>

            <p class="subheading font-weight-medium mb-0">June 28, 2018 at 1:20PM EDT</p>
            <p class="caption">INVOICE LAST VIEWED</p>
          </v-flex>
        </v-layout>

        <v-layout row wrap pt-5 pl-4 pr-4 class="mt-5 dlg-second-panel">
          <v-flex xs6>
            <p class="subheading font-weight-medium mb-0">June 28, 2018 at 1:20PM EDT</p>
            <p class="caption">PAID BY FUNDTHROUGH</p>

            <p class="subheading font-weight-medium mb-0">$11,345</p>
            <p class="caption">AMOUNT</p>

            <p class="subheading font-weight-medium mb-0">$1,000</p>
            <p class="caption">CUSTOMER EMAIL</p>
          </v-flex>

          <v-flex pl-3 xs6 class="dlg-right-panel">
            <p class="subheading font-weight-medium mb-0">Not paid yet</p>
            <p class="caption">PAID BY CUSTOMERS</p>
          </v-flex>
        </v-layout>

        <v-layout mt-3 pt-2 pb-2 class="dlg-button-area" row wrap>
          <v-flex xs6>
            <v-btn flat v-on:click.native="dialogViewFundedInvoice = false">CLOSE</v-btn>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn flat>PREVIEW INVOICE</v-btn>
          </v-flex>
        </v-layout>

      </v-container>
    </v-dialog>

    <v-dialog
      v-model="dialogSendInvoiceForVerification"
      persistent :overlay="false"
      max-width="600px"
      transition="dialog-transition"
    >
      <v-container class="dlg-view-panel">
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs12 text-xs-center>
            <p class="subheading font-weight-medium mb-0">Invoice #134 will be sent to your customer for verification</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap pl-4 pr-4 class="mt-5">
          <v-flex xs6 offset-xs3 text-xs-center>
            <v-text-field
              label="Payor name"
              outline
            ></v-text-field>
            <v-text-field
              label="Payor company"
              outline
            ></v-text-field>
            <v-text-field
              label="Payor email"
              outline
            ></v-text-field>
          </v-flex>
        </v-layout>

        <v-layout mt-3 pt-2 pb-2 class="dlg-button-area" row wrap>
          <v-flex xs6>
            <v-btn flat v-on:click.native="dialogSendInvoiceForVerification = false">CANCEL</v-btn>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn color="primary">NEXT</v-btn>
          </v-flex>
        </v-layout>

      </v-container>
    </v-dialog>

    <v-dialog
      v-model="dialogVerificationMessage"
      persistent :overlay="false"
      max-width="600px"
      transition="dialog-transition"
    >
      <v-container class="dlg-view-panel">
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs12 text-xs-center>
            <p class="subheading font-weight-medium mb-0">Verification message</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs8 offset-xs2 text-xs-center>
            <p class="body-2 font-weight-medium mb-0">
              You're about to send a verifcation email to your payor.<br>
            You can send a default message or create yours.</p>
          </v-flex>
        </v-layout>

        <v-layout mt-4 row wrap class="invoice-company-info">
          <v-flex xs4 text-xs-center>
            <p class="caption mb-0 grey--text"> CUSTOMER NAME</p>
            <p class="subheading">{{invoice.customer}}</p>
          </v-flex>
          <v-flex xs4 text-xs-center>
            <p class="caption mb-0 grey--text"> CUSTOMER COMPANY</p>
            <p class="subheading">{{invoice.customer}}</p>
          </v-flex>
          <v-flex xs4 text-xs-center>
            <p class="caption mb-0 grey--text"> CUSTOMER EMAIL</p>
            <p class="subheading">{{invoice.email_address_opt}}</p>
          </v-flex>
        </v-layout>

        <v-layout row wrap class="vertical-line-group">
          <v-flex xs4>

          </v-flex>
          <v-flex xs4 class="vertical-line">
            &nbsp;
          </v-flex>
          <v-flex xs4>

          </v-flex>
        </v-layout>

        <v-layout row wrap pl-4 pr-4 class="mt-5">
          <v-flex xs8 offset-xs2 text-xs-center>
            <v-textarea
              readonly
              height="210"
              outline
              label="Message"
              v-model="verificationMessageData.message"
            >

            </v-textarea>
          </v-flex>
        </v-layout>

        <v-layout mt-3 pt-2 pb-2 class="dlg-button-area" row wrap>
          <v-flex xs6>
            <v-btn flat v-on:click.native="dialogVerificationMessage = false">CANCEL</v-btn>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn color="primary" v-on:click.native="clickSendVerification">SEND VERIFICATION TO PAYOR</v-btn>
          </v-flex>
        </v-layout>

      </v-container>
    </v-dialog>

    <v-dialog
      v-model="dialogConfirm"
      persistent :overlay="false"
      max-width="550px"
      transition="dialog-transition"
    >
      <v-container class="dlg-view-panel">
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs12 text-xs-center>
            <p class="subheading font-weight-medium mb-0">Confirmation Receipt</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs8 offset-xs2 text-xs-center>
            <p class="body-2 font-weight-medium mb-0">
              You've sent this invoice to your payor for confirmation. Once they verify, we will release funds within 24 hours.
            </p>
          </v-flex>
        </v-layout>

        <v-layout mt-3 pt-2 pb-2 class="dlg-button-area" row wrap>
          <v-flex xs6>

          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn color="primary" v-on:click.native="dialogConfirm = false">DONE</v-btn>
          </v-flex>
        </v-layout>

      </v-container>
    </v-dialog>


    <v-dialog
      v-model="dialogViewInvoiceForRemind"
      persistent :overlay="false"
      max-width="700px"
      transition="dialog-transition"
    >
      <v-container class="dlg-view-panel">
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs6>
            <p class="title mb-0">Invoice #134</p>
            <p class="body-2 view-invoice-status">PENDING</p>
          </v-flex>
          <v-flex xs3>
            <p class="title mb-0">July 13, 2018</p>
            <p>Payment due</p>
          </v-flex>
          <v-flex xs3>
            <p class="title text-xs-right mb-0">$12,345</p>
            <p class="text-xs-right">Amount due</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap pl-4 pr-4 class="mt-5">
          <v-flex xs6>
            <p class="subheading font-weight-medium mb-0">John Smith</p>
            <p class="caption">PAYOR NAME</p>

            <p class="subheading font-weight-medium mb-0">ABC Company</p>
            <p class="caption">PAYOR COMPANY</p>

            <p class="subheading font-weight-medium mb-0">john@abc.com</p>
            <p class="caption">PAYOR NAME</p>
          </v-flex>

          <v-flex pl-3 xs6 class="dlg-right-panel">
            <p class="subheading font-weight-medium mb-0">June 28, 2018 at 1:20PM EDT</p>
            <p class="caption">DATE CREATED</p>

            <p class="subheading font-weight-medium mb-0">Not sent yet</p>
            <p class="caption">DATE SENT</p>

            <p class="subheading font-weight-medium mb-0">Not viewed yet</p>
            <p class="caption">DATE LAST VIEWED</p>
          </v-flex>
        </v-layout>

        <v-layout mt-3 pt-2 pb-2 class="dlg-button-area" row wrap>
          <v-flex xs6>
            <v-btn flat v-on:click.native="dialogViewInvoiceForRemind = false">CLOSE</v-btn>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn flat>PREVIEW INVOICE</v-btn>
            <v-btn color="primary">SEND A REMINDER</v-btn>
          </v-flex>
        </v-layout>

      </v-container>
    </v-dialog>

    <v-dialog
      v-model="dialogReminderMessage"
      persistent :overlay="false"
      max-width="600px"
      transition="dialog-transition"
    >
      <v-container class="dlg-view-panel">
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs12 text-xs-center>
            <p class="subheading font-weight-medium mb-0">Reminder message</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs8 offset-xs2 text-xs-center>
            <p class="body-2 font-weight-medium mb-0">
              You're about to send a reminder email to your payor.<br>
            You can send the message below.</p>
          </v-flex>
        </v-layout>

        <v-layout row wrap pl-4 pr-4 class="mt-5">
          <v-flex xs8 offset-xs2 text-xs-center>
            <v-textarea
              outline
              label="Message"
            >

            </v-textarea>
          </v-flex>
        </v-layout>

        <v-layout mt-3 pt-2 pb-2 class="dlg-button-area" row wrap>
          <v-flex xs6>
            <v-btn flat v-on:click.native="dialogReminderMessage = false">CANCEL</v-btn>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn color="primary">SEND REMINDER TO PAYOR</v-btn>
          </v-flex>
        </v-layout>

      </v-container>
    </v-dialog>

    <v-dialog
      v-model="dialogPayorConfirmInvoice"
      persistent :overlay="false"
      max-width="550px"
      transition="dialog-transition"
    >
      <v-container class="dlg-view-panel">
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs12 text-xs-center>
            <p class="subheading font-weight-medium mb-0">Invoice confirmation</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs8 offset-xs2 text-xs-center>
            <p class="body-2 font-weight-medium mb-0">
              You're about to verify this invoice is correct and you will pay in accordance with its terms and conditions.
            </p>
          </v-flex>
        </v-layout>

        <v-layout mt-3 pt-2 pb-2 class="dlg-button-area" row wrap>
          <v-flex xs6>
            <v-btn flat v-on:click.native="dialogPayorConfirmInvoice = false">CANCEL</v-btn>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn color="primary" v-on:click.native="clickPayorInvoiceConfirm">CONFIRM</v-btn>
          </v-flex>
        </v-layout>

      </v-container>
    </v-dialog>

    <v-dialog
      v-model="dialogPayorRejectInvoice"
      persistent :overlay="false"
      max-width="550px"
      transition="dialog-transition"
    >
      <v-container class="dlg-view-panel">
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs12 text-xs-center>
            <p class="subheading font-weight-medium mb-0">Invoice confirmation</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs8 offset-xs2 text-xs-center>
            <p class="body-2 font-weight-medium mb-0">
              You're about to reject this invoice. You can add a message to your vendor.
            </p>
          </v-flex>
        </v-layout>

        <v-layout row wrap pl-4 pr-4 class="mt-5">
          <v-flex xs8 offset-xs2 text-xs-center>
            <v-textarea
              outline
              label="Message"
              v-model="payorRejectMessageData.message"
            >

            </v-textarea>
          </v-flex>
        </v-layout>

        <v-layout mt-3 pt-2 pb-2 class="dlg-button-area" row wrap>
          <v-flex xs6>
            <v-btn flat v-on:click.native="dialogPayorRejectInvoice = false">CANCEL</v-btn>
          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn color="error" v-on:click.native="clickPayorInvoiceReject">Reject</v-btn>
          </v-flex>
        </v-layout>

      </v-container>
    </v-dialog>

    <v-dialog
      v-model="dialogPayorConfirmed"
      persistent :overlay="false"
      max-width="550px"
      transition="dialog-transition"
    >
      <v-container class="dlg-view-panel">
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs12 text-xs-center>
            <p class="subheading font-weight-medium mb-0">Thank you for verifying this invoice</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap pl-4 pr-4 pt-4>
          <v-flex xs8 offset-xs2 text-xs-center>
            <p class="body-2 font-weight-medium mb-0">

            </p>
          </v-flex>
        </v-layout>

        <v-layout mt-3 pt-2 pb-2 class="dlg-button-area" row wrap>
          <v-flex xs6>

          </v-flex>
          <v-flex xs6 text-xs-right>
            <v-btn color="primary" v-on:click.native="dialogPayorConfirmed = false">DONE</v-btn>
          </v-flex>
        </v-layout>

      </v-container>
    </v-dialog>

  </v-container>
</template>
<style src="./invoice_notification.css" scoped></style>
<script src="./invoice_notification.js"></script>
