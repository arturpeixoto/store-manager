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

const insert = async (name) => {
  const query = 'INSERT INTO products (name) VALUE (?);';
  const [{ insertId }] = await connection.execute(query, [name]);
  console.log(insertId);
  return insertId;
};

module.exports = {
  findAll,
  findById,
  insert,
};