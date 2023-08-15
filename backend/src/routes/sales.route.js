const express = require('express');
const { salesController } = require('../controllers');

const route = express.Router();
route.get('/:id', salesController.saleById);
route.get('/', salesController.allSales);
route.post('/', salesController.newSale);

module.exports = route;