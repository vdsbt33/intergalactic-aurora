const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = new express.Router();
const ProductController = require('../controllers/ProductController');

app.get('/product/get', [ProductController.get.bind(ProductController)]);
app.post('/product/post', [ProductController.post.bind(ProductController)]);

module.exports = app;