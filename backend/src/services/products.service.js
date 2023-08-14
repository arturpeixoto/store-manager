const { productsModel } = require('../models');

const getAllProducts = async () => {
  let data = await productsModel.findAll();
  if (!data || data.length === 0) data = { message: 'There are no products' };
  return { status: 'SUCCESSFUL', data };
};

const getProductById = async (productId) => {
  const data = await productsModel.findById(productId);
  if (!data || data.length === 0) {
  return { 
    status: 'NOT_FOUND', 
    data: { message: 'Product not found' }, 
  }; 
}

  return { status: 'SUCCESSFUL', data };
};

module.exports = {
  getAllProducts,
  getProductById,
};