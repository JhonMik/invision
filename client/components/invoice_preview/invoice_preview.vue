<template>
    <v-container fluid class="invoice-preview-panel" ref="container">
        <v-layout row wrap mt-10>
            <v-flex text-xs-center>
                <p class="headline font-weight-bold">Import Completed!</p>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex d-flex xs12 sm6 offset-sm3 md4 offset-md4>
                <v-card>
                     <v-container fluid grid-list-lg>
                        <v-layout row>
                            <v-flex xs12 sm4>
                                <div>
                                    <div class="fund-heading">12 unpaid invoices</div>
                                    <div class="fund-subheading unpaid">$12,234.00</div>
                                </div>
                            </v-flex>
                            <v-flex xs12 sm4>
                                <div>
                                    <div class="fund-heading">12 unpaid invoices</div>
                                    <div class="fund-subheading">$12,234.00</div>
                                </div>
                            </v-flex>
                            <v-flex xs12 sm4>
                                <div>
                                    <div class="fund-heading">12 unpaid invoices</div>
                                    <div class="fund-subheading">$12,234.00</div>
                                </div>
                            </v-flex>
                        </v-layout>
                     </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex d-flex xs12 sm6 offset-sm3 md4 offset-md4>
                <v-container fluid fill-height class="sort-options">
                    <v-layout row wrap>
                        <v-subheader class="sortby-label">SORT BY</v-subheader>
                        <v-radio-group row>
                            <p-radio class="p-default p-round p-fill" name="radio1" checked>DATE</p-radio>
                            <p-radio class="p-default p-round p-fill" name="radio1">PAYOR</p-radio>
                        </v-radio-group>
                    </v-layout>
                </v-container>
            </v-flex>
        </v-layout>
        <v-layout row wrap>
            <v-flex xs12 sm6 offset-sm3 md4 offset-md4 pb-3>
                <v-card color="white">
                    <v-container class="invoice-item">
                        <v-layout row>
                            <v-flex xs7>
                                <div>
                                    <div class="company-name">Supermodel</div>
                                    <div class="payor">Foster the People</div>
                                </div>
                            </v-flex>
                            <v-flex xs5>
                                <div>
                                    <div class="invoice-mount">$12,345.00</div>
                                    <div class="date">Due on December 20, 2018</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row pt-3>
                            <v-flex xs7>
                                <div class="invoice-id">#Invoic 134</div>
                            </v-flex>
                            <v-flex xs5>
                                <v-btn block color="primary" class="getpaid-btn" v-on:click="getPaid">GET PAID NOW</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3 md4 offset-md4 pb-3>
                <v-card color="white">
                    <v-container class="invoice-item">
                        <v-layout row>
                            <v-flex xs7>
                                <div>
                                    <div class="company-name">Supermodel</div>
                                    <div class="payor">Foster the People</div>
                                </div>
                            </v-flex>
                            <v-flex xs5>
                                <div>
                                    <div class="invoice-mount">$12,345.00</div>
                                    <div class="date">Due on December 20, 2018</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row pt-3>
                            <v-flex xs7>
                                <div class="invoice-id">#Invoic 134</div>
                            </v-flex>
                            <v-flex xs5>
                                <v-btn block color="primary" class="getpaid-btn" v-on:click="getPaid">GET PAID NOW</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
            <v-flex xs12 sm6 offset-sm3 md4 offset-md4 pb-3>
                <v-card color="white">
                    <v-container class="invoice-item">
                        <v-layout row>
                            <v-flex xs7>
                                <div>
                                    <div class="company-name">Supermodel</div>
                                    <div class="payor">Foster the People</div>
                                </div>
                            </v-flex>
                            <v-flex xs5>
                                <div>
                                    <div class="invoice-mount">$12,345.00</div>
                                    <div class="date">Due on December 20, 2018</div>
                                </div>
                            </v-flex>
                        </v-layout>
                        <v-layout row pt-3>
                            <v-flex xs7>
                                <div class="invoice-id">#Invoic 134</div>
                            </v-flex>
                            <v-flex xs5>
                                <v-btn block color="primary" class="getpaid-btn" v-on:click="getPaid">GET PAID NOW</v-btn>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
        <v-dialog v-model="pay_dialog" max-width="600px">
            <v-card>
                <v-stepper v-model="e1">
                    <v-stepper-items>
                        <v-stepper-content step="1">
                            <v-card-text class="card-text">
                                <p class="headline font-weight-bold mt-5">
                                    Awesome!
                                </p>
                                <p class="subheading mt-2 mb-3" style="padding:10px;">
                                    To get paid, we need to send an email to your customer to confirm your invoice. 
                                </p>
                                <p class="subheading mt-2 mb-5">
                                    You can also send an explainer email to your customer … need text for that…
                                    Would you like to send it? 
                                </p>
                                <p-check class="p-icon p-curve" v-model="isSend">
                                    <i class="icon material-icons" slot="extra">done</i>
                                    Send an intro email to your customer
                                </p-check>
                            </v-card-text>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" @click.native="e1 = 2">Continue</v-btn>
                            </v-card-actions>
                        </v-stepper-content>
                        <v-stepper-content step="2">
                            <v-card-text class="card-text">
                                <v-flex>
                                    <p class="email-headline font-weight-bold mt-5">
                                        Verification message to your customer
                                    </p>
                                    <p class="email-subheading mt-2 mb-3" style="padding:10px;">
                                        You're about to send a verification email to your customer. You can send a default message or create yours.
                                    </p>
                                </v-flex>
                                <v-container fluid grid-list-lg >
                                    <v-layout row class="customer-info">
                                        <v-flex xs4>
                                            <div>
                                                <div class="info-detail-heading">CUSTOMER NAME</div>
                                                <div class="info-detail-subheading">JHON JhonSon</div>
                                            </div>
                                        </v-flex>
                                        <v-flex xs4>
                                            <div>
                                                <div class="info-detail-heading">CUSTOMER COMPANY</div>
                                                <div class="info-detail-subheading">ABC Company</div>
                                            </div>
                                        </v-flex>
                                        <v-flex xs4>
                                            <div class="email">
                                                <div class="info-detail-heading">CUSTOMER EMAIL</div>
                                                <div class="info-detail-subheading">test@test.com</div>
                                            </div>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                            <v-divider></v-divider>
                                <v-container fluid class="sample-text-panel">
                                    <v-layout row>
                                        <v-flex xs12>
                                            <v-textarea
                                                name="sample_text"
                                                label="Sample Text"
                                                :value="sample_text"
                                                outline
                                                class="sample-text"
                                                rows="10"
                                                ></v-textarea>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            <v-divider></v-divider>
                            <v-card-actions>
                                <v-spacer></v-spacer>
                                <v-btn color="primary" v-on:click="continueWithEmail">Continue</v-btn>
                            </v-card-actions>
                        </v-stepper-content>
                    </v-stepper-items>
                </v-stepper>
            </v-card>
        </v-dialog>
    </v-container>

</template>
<style src="./invoice_preview.css" scoped></style>
<style src="../../../node_modules/pretty-checkbox/dist/pretty-checkbox.min.css"></style>
<script src="./invoice_preview.js"></script>