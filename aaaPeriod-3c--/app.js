var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//Session/Redis middleware requires
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
//---------------------------------

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Opret forbindelse til Redis-db.
var client = require('./db/redis').client;

//Session/Redis middleware usage
app.use(session({ //Her lægges session ned til Redis-databasen, i stedet for at gemme den hos brugeren.
    secret: 'top_secret_secret',
    store: new RedisStore({
        host: "pub-redis-18992.us-east-1-4.6.ec2.redislabs.com:18992",
        client: client
    }),
    saveUninitialized: false,
    resave: false,
    cookie: {maxAge: 60 * 1000} //1 min
}));
//---------------------------------

//SKRIV I TERMINALEN FOR AT LOGGE IND PÅ REDIS-CLI:
//redis-cli -h pub-redis-18992.us-east-1-4.6.ec2.redislabs.com -p 18992 -a nicolai
//SKRIV keys *    FOR AT FÅ EN LISTE AF KEYS

app.use('/', index);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
