const express = require('express');
const { productsController } = require('../controllers');

const route = express.Router();
route.get('/:id', productsController.productById);
route.get('/', productsController.allProducts);

module.exports = route;