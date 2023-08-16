const { productsService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const allProducts = async (_req, res) => {
  const { status, data } = await productsService.getAllProducts();
  return res.status(mapStatusHTTP(status)).json(data);
};

const productById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.getProductById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { status, data } = await productsService.insertNewProduct(name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { status, data } = await productsService.updatingProduct(id, name);
  return res.status(mapStatusHTTP(status)).json(data);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await productsService.eliminateProduct(id);
  if (data) return res.status(mapStatusHTTP(status)).json(data);
  return res.status(mapStatusHTTP(status)).end();
};

module.exports = {
  allProducts,
  productById,
  createProduct,
  updateProduct,
  deleteProduct,
};