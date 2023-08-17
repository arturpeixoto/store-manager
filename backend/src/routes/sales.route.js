const express = require('express');
const { salesController } = require('../controllers');
const { validateInputsNewSale, validateQuantity } = require('../middlewares/validateNewSale');

const route = express.Router();

route.get('/:id', salesController.saleById);

route.delete('/:id', salesController.deleteSale);

route.get('/', salesController.allSales);

route.post('/', validateInputsNewSale, validateQuantity, salesController.newSale);

module.exports = route;