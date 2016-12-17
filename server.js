const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config/conf.json');
const passport = require('passport');
const twig = require("twig");

require('./app-api/models/db');
require('./app-api/config/passport');
const routesUsers = require('./app-api/routes/user');
const routesIndex = require('./app-api/routes/index');
const routesAuth = require('./app-api/routes/authentication');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app-api/views'));
app.set('view engine', 'twig');
app.set('twig options', {
    strict_variables: false
});
app.engine('html', require('twig').renderFile);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', routesUsers);
app.use('/', routesIndex);
app.use('/', routesAuth);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// catch 401 unauthorised erros
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401);
        res.json({"message" : err.name + ": " + err.message});
    }
});

const server = app.listen(config.app.port, function() {
    console.log('*********************\n' + '*   SERVER START   *\n' + '*********************\n'+
        'API documentation : http://%s:%s\n', config.app.host, config.app.port);
});

module.exports = app;