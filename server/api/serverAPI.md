# NZFE server api endpoints

** User Authentication
----
  Provides authentication based on provided email and password.  Returns a token which is used as a bearer token to authenticate all subsequent requests in the current session.

* **URL**

  /auth/local

* **Method:**

  `POST`
  
*  **URL Params**

  None

* **Data Params**

   **Required:**
 
   `email: [string] <br />
   password: [string]`

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{ token : [string], userId : [string] }`
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `{ message : 'Missing credentials' }`
    OR
    **Content:** `{ message : 'This password is not correct.' }`
    OR
    **Content:** `{ message : 'This email is not registered.' }`

** Show Invoices
----
  Returns json data about a collection of invoices filtered by category.

* **URL**

  /api/invoices

* **Method:**

  `GET`
  
*  **URL Params**

  None

*  **Query Params**

   **Optional:**
 
   `status=<invoice_status_code>` - Filter by invoice status.  See NZFE requirements document for more information.
   `past_due=<#days>`                        - Filter by days past due.

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```
    [
      {
        "id": String,
        "number": String,
        "customer": String,
        "state": String,
        "amount": String,
        "due_date": String,
        "balance": String,
        "currency": String
      },
      ... etc.
    ]
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`  (Missing or invalid bearer token)

  OR

  * **Code:** 400 BAD REQUEST <br />
    **Content:** `past_due parameter must be a number`

** Show Invoice
----
  Returns json data about an individual invoice specified by id field (see explanation above).

* **URL**

  /api/invoices/:id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
 
   `id [integer]` - This is the invoice id seen in the "Show Invoices" endpoint.

*  **Query Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```

    Same as "Show Invoices" endpoint.
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`  (Missing or invalid bearer token)

  OR

  * **Code:** 400 BAD REQUEST <br />

** Set Invoice Verification Status
----
  Record the current verification status of a specified invoice

* **URL**

  /api/invoices/:id/verification/status/:status

* **Method:**

  `PUT`
  
*  **URL Params**

   **Required:**
 
   `id [integer]` - This is the invoice id seen in the "Show Invoices" endpoint.
   `status [string]` - 'requested' OR 'accepted' OR 'disputed' OR 'delayed' OR 'approved' OR 'rejected'

*  **Query Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** ```
    {
        "message": "Verification status set."
    }
    ```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`  (Missing or invalid bearer token)

  OR

  * **Code:** 400 BAD REQUEST <br />

** Show Customers
----
  Returns json data about customers.

* **URL**

  /api/customers

* **Method:**

  `GET`
  
*  **URL Params**

  None

*  **Query Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
```
[
  {
    "id": Number,
    "contactName": String,
    "companyName": String,
    "contactEmail": String,
    "unpaidInvoices": Number,
    "unpaidAmount": Number
  },
  ... etc.
]
```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`  (Missing or invalid bearer token)

** Show Dashboard Summary
----
  Returns json summary data for dashboard page.

* **URL**

  /api/dashboard/summary

* **Method:**

  `GET`
  
*  **URL Params**

  None

*  **Query Params**

  None

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
```
{
    "unpaidInvoicesCount": Number,
    "unpaidInvoicesTotal": Number,
    "averageDaysPastDue": Number,
    "fundedInvoicesCount": Number,
    "fundedInvoicesTotal": Number,
    "overdue0130Count": Number,
    "overdue0130Total": Number,
    "overdue3160Count": Number,
    "overdue3160Total": Number,
    "overdue6190Count": Number,
    "overdue6190Total": Number,
    "overdue90PlusCount": Number,
    "overdue90PlusTotal": Number
}
```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`  (Missing or invalid bearer token)

** Show Dashboard Recently Funded Invoices
----
  Returns json funded invoice data for dashboard page.

* **URL**

  /api/dashboard/funded

* **Method:**

  `GET`
  
*  **URL Params**

  None

*  **Query Params**

  days (Integer) - number of recent days to include (default 7)

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
```
[
    {
        "customer": String,
        "invoice": Number,
        "dateFunded": String,
        "fundedAmount": Number,
        "fundingFees": Number
    },
    etc...
]
```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`  (Missing or invalid bearer token)

** Show Dashboard Recently Paid Invoices
----
  Returns json paid invoice data for dashboard page.

* **URL**

  /api/dashboard/paid

* **Method:**

  `GET`
  
*  **URL Params**

  None

*  **Query Params**

  days (Integer) - number of recent days to include (default 7)

* **Data Params**

  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** 
```
[
    {
        "customer": String,
        "invoice": Number,
        "datePaid": String,
        "paidAmount": Number,
        "daysToPay": Number
    },
    etc...
]
```
 
* **Error Response:**

  * **Code:** 401 UNAUTHORIZED <br />
    **Content:** `Unauthorized`  (Missing or invalid bearer token)