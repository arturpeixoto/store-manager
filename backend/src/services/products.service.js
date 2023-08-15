const schema = require('./validations/validateInputValues');
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

const insertNewProduct = async (name) => {
  const error = schema.validateProductName({ name });
  if (error) return { status: error.status, data: { message: error.message } };

  const newProductId = await productsModel.insert(name);
  const newProduct = await productsModel.findById(newProductId);
  console.log(newProduct);
  return { status: 'CREATED', data: newProduct };
};

module.exports = {
  getAllProducts,
  getProductById,
  insertNewProduct,
};