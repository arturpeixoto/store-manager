const express = require('express');
const { salesController } = require('../controllers');
const { 
  validateInputsNewSale, 
  validateQuantity, 
  validateUpdateSalesProductsField, 
} = require('../middlewares/validateNewSale');

const route = express.Router();

route.get('/:id', salesController.saleById);

route.put(
  '/:saleId/products/:productId/quantity', 
  validateUpdateSalesProductsField, 
  validateQuantity, 
  salesController.changeSaleProduct,
);

route.delete('/:id', salesController.deleteSale);

route.get('/', salesController.allSales);

route.post('/', validateInputsNewSale, validateQuantity, salesController.newSale);

module.exports = route;