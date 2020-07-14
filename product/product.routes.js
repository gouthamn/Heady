var express = require('express');
var controller = require('./product.controller');

var router = express.Router();

router.post('/', controller.createProduct);

router.put('/', controller.updateProduct);

module.exports = router;