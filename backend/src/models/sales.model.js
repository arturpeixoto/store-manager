const camelize = require('camelize');
const connection = require('./connection');
const {
  getFormattedColumnNames,
  getFormattedPlaceholders,
} = require('../utils/generateFormattedQuery');

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

const createNewSaleDate = async () => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO sales (date) VALUES (NOW());',
  );
  return insertId;
};

const insert = async (saleInfo) => {
  let insertPromises = [];
  const saleId = await createNewSaleDate();
  insertPromises = saleInfo.map(async (sale) => {
      const saleObj = { ...sale, saleId };
      const columns = getFormattedColumnNames(saleObj);
      const placeholders = getFormattedPlaceholders(saleObj);
      const query = `INSERT INTO sales_products (${columns}) VALUES (${placeholders})`;
      return connection.execute(query, [...Object.values(saleObj)]);
    });
    await Promise.all(insertPromises);
  return {
    id: saleId,
    itemsSold: saleInfo,
  };
};

const eliminate = async (saleId) => {
  const query = 'DELETE FROM sales WHERE id = ?';
  return connection.execute(query, [saleId]);
};

const createUpdatedSaleDate = async (saleId) => {
  const query = 'UPDATE sales SET date = NOW() WHERE id = ?';
  return connection.execute(query, [saleId]);
};

const updateSalesProducts = async (saleId, productId, quantity) => {
  await createUpdatedSaleDate(saleId);
  const query = 'UPDATE sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?';
  await connection.execute(query, [quantity, saleId, productId]);
  const query1 = `SELECT product_id, quantity, date, sale_id FROM sales_products sp
  INNER JOIN sales sa ON sa.id = sp.sale_id
  WHERE sale_id = ? AND product_id = ?`;
  const [[saleProduct]] = await connection.execute(query1, [saleId, productId]);
  return camelize(saleProduct);
};

module.exports = {
  findAll,
  findById,
  insert,
  eliminate,
  updateSalesProducts,
};