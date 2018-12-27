'use strict'

const axios = require('axios');

// These "spoofed" uuids are for testing.
let braavos = null;

function getBraavosApi() {
  return braavos
    || (braavos = axios.create({
          baseURL: process.env.BRAAVOS_URI,
          headers: { Authorization: `Bearer ${process.env.BRAAVOS_TOKEN}` }
        }));
}

function getData(uri) {
  return getBraavosApi().get(uri).then(response => response.data).catch(error => error.response.data);
}

function getDataIfValidId(uuid, uriPart1, uriPart2) {
  // verify the format of the uuid before sending the request
  if (/^[0-9a-fA-F]{40}$/.test(uuid)) {
    return getData(uriPart1 + uuid + uriPart2);
  } else{
    return(Promise.reject(new Error('Invalid owner ID')));
  }
}

module.exports = {
  getBankAccounts: function(uuid) {
    return getDataIfValidId(uuid, 'banking/owners/', '/accounts');
  },

  getCustomers: function(uuid) {
    return getDataIfValidId(uuid, 'accounting/owners/', '/customers');
  },

  getInvoices: async function(uuid) {
    if (process.env.TEST_INVOICES) {
      return require('../../api/testInvoices');
    } else {
      return getDataIfValidId(uuid, 'accounting/owners/', '/invoices?state=outstanding')
      .then(data => {
        return data.invoices;
      });
    }
  },

  getCompanyInfo: function(uuid) {
    return getDataIfValidId(uuid, 'accounting/owners/', '/company');
  }
}