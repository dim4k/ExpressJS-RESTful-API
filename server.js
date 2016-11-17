const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('./config/conf.json');

const index = require('./app-api/routes/index');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app-api/views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

const server = app.listen(config.app.port, function() {
    console.log('App listening at http://%s:%s', config.app.host, config.app.port);
});

module.exports = app;