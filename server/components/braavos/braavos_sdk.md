# Braavos SDK - a small library for accessing Braavos API endpoints for NZFE

### Usage

`const braavos = require('<ProjectRootDir>/client/components/braavos');`

`braavos.getBankAccounts(uuid);`

`braavos.getCustomers(uuid);`

`braavos.getInvoices(uuid);`

`braavos.getCompanyInfo(uuid);`

#### Return values
Each function returns a promise.  Upon fulfillment, the response will contain an object corresponding to the JSON response from Braavos.
getInvoices filters the data according to NZFE rules.
