const express = require('express');
const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ejsLayouts = require('express-ejs-layouts');

const indexRouter = require('./routes');
const userRouter = require('./routes/users');


const userCheckSession = require('./middleware/LoginMiddleware');


const session = require('express-session')



const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))


app.use(userCheckSession.checkLocal)

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('layout', 'layouts/layout'); // Đường dẫn đến layout mặc định
app.set('view engine', 'ejs');

// Sử dụng ejs-layouts middleware
app.use(ejsLayouts);

// Routes
app.use('/', indexRouter);
app.use('/users', userRouter);

// 404 Error Handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Error Handler
app.use(function(err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
