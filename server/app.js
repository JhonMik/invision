const path = require('path');
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const serveStatic = require('serve-static');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const errorHandler = require('errorhandler');
const passport = require('passport');

const app = express();

app.set('port', process.env.PORT || 5050);

app.use(morgan('dev'));
app.use(compression());
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

app.use(serveStatic(path.join(__dirname, '../dist')));

require('./routing.js')(app);
app.use(errorHandler());

module.exports = app;
