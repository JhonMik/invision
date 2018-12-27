<template>
  <v-container fluid fill-height justify-center class="document-info-panel">
    <v-layout row wrap>
      <v-container class="document-info-form-panel">
        <v-form>
            <v-layout row wrap>
                <v-flex xs12 sm8 offset-sm2 md6 offset-md3 text-xs-center>
                    <p class="headline font-weight-bold">
                        Oops, it looks like we’re missing a few details
                    </p>
                    <p class="subheading mt-2">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam sit amet felis ut sapien eleifend consectetur et quis felis. Vestibulum aliquet mi orci, eu consequat risus pulvinar non. 
                    </p>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex d-flex xs12 sm8 offset-sm2 md6 offset-md3>
                    <v-container fluid fill-height class="document-info-row">
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md6 pl-5>
                                <v-text-field
                                    label="Company name"
                                    outline
                                    v-model="companyname"
                                    :error-messages="companynameErrors"
                                    @input="$v.companyname.$touch()"
                                    @blur="$v.companyname.$touch()"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6 pl-5>
                                <v-text-field
                                    label="Country"
                                    outline
                                    v-model="country"
                                    :error-messages="countryErrors"
                                    @input="$v.country.$touch()"
                                    @blur="$v.country.$touch()"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
                <v-flex d-flex xs12 sm8 offset-sm2 md6 offset-md3>
                    <v-container fluid fill-height class="document-info-row">
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md6 pl-5>
                                <v-text-field
                                    label="Province"
                                    outline
                                    v-model="province"
                                    :error-messages="provinceErrors"
                                    @input="$v.province.$touch()"
                                    @blur="$v.province.$touch()"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6 pl-5>
                                <v-text-field
                                    label="City"
                                    outline
                                    v-model="city"
                                    :error-messages="cityErrors"
                                    @input="$v.city.$touch()"
                                    @blur="$v.city.$touch()"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
                <v-flex d-flex xs12 sm8 offset-sm2 md6 offset-md3>
                    <v-container fluid fill-height class="document-info-row">
                        <v-layout row wrap>
                            <v-flex xs12 sm6 md6 pl-5>
                                <v-text-field
                                    label="Business structure"
                                    outline
                                    v-model="businessstructure"
                                    :error-messages="businessstructureErrors"
                                    @input="$v.businessstructure.$touch()"
                                    @blur="$v.businessstructure.$touch()"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md6 pl-5>
                                <v-text-field
                                    label="Business insdustry"
                                    outline
                                    v-model="businessindustry"
                                    :error-messages="businessindustryErrors"
                                    @input="$v.businessindustry.$touch()"
                                    @blur="$v.businessindustry.$touch()"
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 sm6 offset-sm3 md4 offset-md4 text-xs-center pl-5 pr-5>
                    <p class="subheading mt-2">
                        In order to verify your identity, please upload at least 2 documents of your choice.
                    </p>
                </v-flex>
            </v-layout>
            <v-layout row wrap>
                <v-flex xs12 sm6 offset-sm3 md2 offset-md5>
                    <v-btn block color="white" v-on:click="uploadDialog">DRIVER'S LICENSE</v-btn>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3 md2 offset-md5>
                    <v-btn block color="white" v-on:click="uploadDialog">FINANCIAL STATEMENT</v-btn>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3 md2 offset-md5>
                    <v-btn block color="white" v-on:click="uploadDialog">MPSA CONTRACT</v-btn>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3 md2 offset-md5>
                    <v-btn block color="white" v-on:click="uploadDialog">VOID CHECK</v-btn>
                </v-flex>
                <v-flex xs12 sm6 offset-sm3 md2 offset-md5>
                    <v-btn block color="white" v-on:click="uploadDialog">BANK ACCOUNT STATEMENT</v-btn>
                </v-flex>
                <v-flex mt-3 xs12 sm6 offset-sm3 md2 offset-md5>
                    <v-btn block color="primary" v-on:click="onContinue">Continue</v-btn>
                </v-flex>
            </v-layout>
        </v-form>
      </v-container>
    </v-layout>
    <v-dialog v-model="upload_dialog" max-width="600px">
        <v-card>
            <v-card-text>
                <v-container fluid fill-height>
                    <v-layout row wrap>
                        <v-flex xs12 text-xs-center>
                            <p class="upload-dialog-headline font-weight-bold mt-5">
                                Upload your document
                            </p>
                        </v-flex>
                        <v-flex xs12 class="dropzone" text-xs-center>
                            <p class="upload-text">
                                Drag & Drop to upload, or
                            </p>
                            <v-btn color="white">ATACH A FILE</v-btn>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-card-actions>
                    <v-btn  flat @click.native="upload_dialog = false">Close</v-btn>
                </v-card-actions>
            </v-card-actions>
        </v-card>
    </v-dialog>
  </v-container>
</template>

<style src="./upload_document.css" scoped></style>
<script src="./upload_document.js"></script>