const camelize = require('camelize');
const connection = require('./connection');

const findAll = async () => {
  const [sales] = await connection.execute(
  `SELECT sale_id, product_id, quantity, date
  FROM sales_products sp INNER JOIN sales sa ON sa.id = sp.sale_id`,
);
  return camelize(sales);
};

const findById = async (saleId) => {
  const [sale] = await connection.execute(
    `SELECT product_id, quantity, date FROM sales_products sp
    INNER JOIN sales sa ON sa.id = sp.sale_id
    WHERE sale_id = ?`,
    [saleId],
);
  return camelize(sale);
};

module.exports = {
  findAll,
  findById,
};