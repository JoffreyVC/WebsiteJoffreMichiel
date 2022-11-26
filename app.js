//importeert node libraries

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var indexRouter = require('./routes/index'); //importeert modules van de routes directory
var usersRouter = require('./routes/users');
const catalogRouter = require("./routes/catalog"); //Import routes for "catalog" area of site

const helmet = require("helmet");
const compression = require("compression");
const mongoose = require("mongoose");
const dev_db_url ="mongodb+srv://JoffreyVC:9e28d91f@clusterlabo.jpdgxof.mongodb.net/?retryWrites=true&w=majority";
const mongoDB = process.env.MONGODB_URI || dev_db_url;
const multer = require('multer');
const upload = multer({dest: 'uploads/'});

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var app = express();

app.use('/public',express.static('public')); 



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//voegt de bovenstaande modules toe aan de request handling chain
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression()); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/catalog", catalogRouter);
app.use(compression()); // Compress all routes

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
