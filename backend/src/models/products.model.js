const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [product] = await connection.execute('SELECT * FROM products');
  console.log(product);
  return camelize(product);
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return camelize(product);
};

module.exports = {
  findAll,
  findById,
};