var express = require('express');
var controller = require('./category.controller');

var router = express.Router();

router.get('/products', controller.fetchProductsByCategory);

router.post('/', controller.createCategory);

router.get('/', controller.fetchCategories);

module.exports = router;