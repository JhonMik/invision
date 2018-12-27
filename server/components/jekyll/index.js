const axios = require('axios');
const JEKYLL_USER='/users/'

let Jekyll = null;
let AccessToken = null;

function getJekyllApi() {
  return Jekyll
    || (Jekyll = axios.create({
          baseURL: process.env.JEKYLL_URI,
          headers: {'client': 'nzfe-client'}
        }));
}

module.exports = {

signIn: function(email, password) {
  return getJekyllApi()
        .request({method: 'post',
                  url: process.env.JEKYLL_SIGNIN, 
                  data: { 'email': email, 'password': password }})
        .then(result => {
          AccessToken = result.headers['access-token'];
          return result.data.data.user;
        })
        .catch(err => err);
},

validate: function(email) {
  return getJekyllApi()
        .request({method: 'get',
                  url: process.env.JEKYLL_VALIDATION, 
                  headers: {'access-token': AccessToken, 'uid': email}})
        .then(result => {
          // The old token is valid until a new one is provided
          if (result.headers['access-token']) {
            AccessToken = result.headers['access-token'];
          }
          return result.data.data.user;
        })
        .catch(err => err);

},

nzfeAuth: function(uuid) {
  return getJekyllApi()
        .request({method: 'post',
                  url: process.env.JEKYLL_NZFE_AUTH, 
                  data: { 'uuid': uuid },
                  headers: { Authorization: `Bearer ${process.env.NZFE_AUTH_TOKEN}` }})
        .then(result => {
          AccessToken = result.data.token['access-token'];
          return result.data.user;
        })
        .catch(err => err);
},

getUser: async function(uuid) {
  return getJekyllApi()
        .request({method: 'get',
                  url: JEKYLL_USER + uuid,
                  headers: { Authorization: `Bearer ${process.env.NZFE_AUTH_TOKEN}` }})
        .then(result => result.data.user);
},

}