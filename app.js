var express = require('express');
//
var appRoot = require('app-root-path');
//
var createError = require('http-errors');
//
var mongoose = require('mongoose');

var app = express();

var categoryRouter = require(appRoot + '/category/category.routes');
var productRouter = require(appRoot + '/product/product.routes');

// Connect to Database
mongoose.connect(process.env.mongourl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

// On Connection Success
mongoose.connection.on('connected', () => {
    console.log('Connected to database : ' + process.env.mongourl);
});

// On Connection Failure
mongoose.connection.on('error', (err) => {
    console.log('Database Error : ' + err);
});

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use('/category', categoryRouter);
app.use('/product', productRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;

