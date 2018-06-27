const express = require('express');
const app = express();
const newRoute = require('./routes/new-user');
const addRoute = require('./routes/add');
const listRoute = require('./routes/list');

app.set('views', './views');
app.set('view engine', 'pug');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('./public'));
// app.use('/build', express.static('./build'));

app.get('/', function(req, res) {
  res.render('index')
})

app.use(newRoute);
app.use(addRoute);
app.use(listRoute);
module.exports = app;