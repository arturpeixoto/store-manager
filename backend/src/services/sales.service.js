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
  const results = await productsModel.findMultipleById(saleInfo);

  const hasProductNotFound = results.some((productExists) => !productExists);
  if (hasProductNotFound) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found' } };
  }

  const data = await salesModel.insert(saleInfo);
  return { status: 'CREATED', data };
};

const eliminateSale = async (saleId) => {
  const saleExists = await salesModel.findById(saleId);
  if (!saleExists || saleExists.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }

  await salesModel.eliminate(saleId);
  return { status: 'NO_CONTENT' };
};

const updatingSalesProducts = async (saleId, productId, quantity) => {
  const saleExists = await salesModel.findById(saleId);
  if (!saleExists || saleExists.length === 0) {
    return { status: 'NOT_FOUND', data: { message: 'Sale not found' } };
  }
  const saleProductExists = saleExists
    .some((saleProduct) => saleProduct.productId === Number(productId));
  if (!saleProductExists) {
    return { status: 'NOT_FOUND', data: { message: 'Product not found in sale' } };
  }

  const updatedSalesProducts = await salesModel.updateSalesProducts(saleId, productId, quantity);
  return { status: 'SUCCESSFUL', data: updatedSalesProducts };
};

module.exports = { 
  getAllSales,
  getSaleById,
  postNewSale,
  eliminateSale,
  updatingSalesProducts,
};