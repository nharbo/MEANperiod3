var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var session = require('express-session');

//Extra security
var helmet = require('helmet');
var session = require('cookie-session');

var authApi = require('./routes/authApi');
var userApi = require('./routes/userApi');
var adminApi = require('./routes/adminApi');
var bloggerApi = require('./routes/bloggerApi');
var readerApi = require('./routes/readerApi');


var app = express();

app.set('trust proxy', 1); // trust first proxy
app.use( session({ //cookien får et andet navn, end standardnavnet.
        secret : 'h1dd3n_s3cr37_y0',
        name : 'c00ki3_l0l'
    })
);

var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1hour
app.use(session({
        name: 'session',
        keys: ['key1', 'key2'],
        cookie: { secure: true, //Ensures the browser only sends the cookie over HTTPS.
            httpOnly: true, //Ensures the cookie is sent only over HTTP(S), not client JavaScript, helping to protect against cross-site scripting attacks.
            domain: 'example.com', //indicates the domain of the cookie
            path: 'foo/bar', //indicates the path of the cookie
            expires: expiryDate //use to set expiration date for persistent cookies.
        }
    })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');


app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({secret: 'blog'}));
require('./config/passport.js')(app);
app.use(express.static(path.join(__dirname, 'public'))); //Her kigges først
app.use(express.static(path.join(__dirname, 'views'))); //Her kigges efterfølgende, og hvis ikke der findes noget at vise, går vi videre til app.get


//Her skal laves et tjek for cookies tænker jeg? Så man kun kan bruge api for eksempelvis blogger hvis man er logget ind.
app.use('/', authApi);
app.use('/blogger', bloggerApi);
app.use('/admin', adminApi);
app.use('/user', userApi);
app.use('/reader', readerApi);

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
