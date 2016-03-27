var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session')

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'brabra',
    resave: false,
    saveUninitialized: true,
    cookie: {
//        secure: true
    }
}));

app.get("/login", function(req, res){
    res.render("login");
})

app.post("/login", function(req, res){
    var username = req.body.username;
    console.log(username);
    req.session.username = username;
    res.redirect("/");
})

app.get("/logout", function(req, res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        }
        res.redirect("/");
    })
})

app.get("/", function(req, res){
    var username = req.session.username;
    console.log("user: ", username);
    res.render("index", {
        username: username,
        cookie: req.cookies
    });
})

//app.use('/', routes);
//app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
