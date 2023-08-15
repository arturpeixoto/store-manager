const { salesModel, productsModel } = require('../models');

const getAllSales = async () => {
  let data = await salesModel.findAll();
  if (!data || data.length === 0) data = { message: 'There are no sales' };
  return { status: 'SUCCESSFUL', data };
};

const getSaleById = async (saleId) => {
  const data = await salesModel.findById(saleId);
  if (!data || data.length === 0) {
  return { 
    status: 'NOT_FOUND', 
    data: { message: 'Sale not found' }, 
  }; 
}
  return { status: 'SUCCESSFUL', data };
};

const postNewSale = async (saleInfo) => {
  const findPromises = saleInfo.map((info) => productsModel.findById(info.productId));
  const results = await Promise.all(findPromises);

  const hasProductNotFound = results.some((productExists) => !productExists);
  if (hasProductNotFound) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const data = await salesModel.insert(saleInfo);

  return { status: 'CREATED', data };
};

module.exports = { 
  getAllSales,
  getSaleById,
  postNewSale,
};