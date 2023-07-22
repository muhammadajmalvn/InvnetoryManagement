var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config()
const cors = require('cors');

var indexRouter = require('./routes/index');

var app = express();

const corsOptions = {
  origin: `${process.env.BASE_URL}`,
  credentials: true,            //access-control-allow-credentials:true
  optionSuccessStatus: 200,
}
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//mongodb connection
const uri = process.env.MONGO_DB_URI
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("Connected to MongoDB"))
  .catch(error => console.log("Error connecting to MongoDB", error));


app.use('/', indexRouter);

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


const PORT = process.env.PORT || 5000
const server = app.listen(PORT, console.log(`Port is running in http://localhost:${PORT}/`))

module.exports = app;
