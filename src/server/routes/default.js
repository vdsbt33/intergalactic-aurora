const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = new express.Router();
const ProductController = require('../controllers/ProductController');

app.get('/products/get', [ProductController.get.bind(ProductController)]);
app.post('/products/post', [ProductController.post.bind(ProductController)]);
app.put('/products/put', [ProductController.put.bind(ProductController)]);

app.delete('/products/delete', [ProductController.delete.bind(ProductController)]);

module.exports = app;