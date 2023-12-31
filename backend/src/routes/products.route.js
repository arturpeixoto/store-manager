const express = require('express');
const { productsController } = require('../controllers');
const validateProductFields = require('../middlewares/validateProductFields');

const route = express.Router();

route.get('/search', productsController.productBySearchQuery);

route.get('/:id', productsController.productById);

route.put('/:id', validateProductFields, productsController.updateProduct);

route.delete('/:id', productsController.deleteProduct);

route.get('/', productsController.allProducts);

route.post('/', validateProductFields, productsController.createProduct);

module.exports = route;