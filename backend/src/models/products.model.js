const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [product] = await connection.execute('SELECT * FROM products');
  return camelize(product);
};

const findById = async (productId) => {
  const [[product]] = await connection.execute('SELECT * FROM products WHERE id = ?', [productId]);
  return camelize(product);
};

const findMultipleById = async (productsBody) => {
  const findPromises = productsBody.map((info) => findById(info.productId));
  const results = await Promise.all(findPromises);
  return results;
};

const insert = async (name) => {
  const query = 'INSERT INTO products (name) VALUE (?);';
  const [{ insertId }] = await connection.execute(query, [name]);
  return insertId;
};

const update = async (productId, productToUpdate) => {
  const query = 'UPDATE products SET name = ? WHERE id = ?';
  return connection.execute(query, [productToUpdate, productId]);
};

const eliminate = async (productId) => {
  const query = 'DELETE FROM products WHERE id = ?';
  return connection.execute(query, [productId]);
};

module.exports = {
  findAll,
  findById,
  insert,
  update,
  eliminate,
  findMultipleById,
};