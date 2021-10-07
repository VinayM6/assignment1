/*
File Name - app.js
Student Name - Vinay Kumar Mannem
Student Id - 301211306
Date - 04-10-2021
Below are the thrid part packages
 */
let createError = require('http-errors');
//requires - used to link packages, the dependecies for project to our mannifest
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');

let indexRouter = require('./routes/index');//Route1
let usersRouter = require('./routes/users');//Route2 for users

let app = express();//It creates new instance of express application

// view engine setup; app.set things to configure views and view engine
//path.join is built in module - join regular path for search when manifest looks for file in views folder (join views in search path)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');//express -e : configure view engine to ejs;
//Below statements activate below modules and use of static routes. Files under static can be  accessed by everyone
//For static routes,no need to specify routes in index.js file to fetch the properties/to access the files in static path
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));
//activate '/' for index router, which trigger index.js file
app.use('/', indexRouter);
app.use('/users', usersRouter);//activate '/users' for users router, which trigger user.js file

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
  res.render('error', { title: 'Error'});
});

module.exports = app;
