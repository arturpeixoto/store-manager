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
  if (saleInfo && saleInfo.length > 0) {
    insertPromises = saleInfo.map(async (sale) => {
      const saleObj = { ...sale, saleId };
      const columns = getFormattedColumnNames(saleObj);
      const placeholders = getFormattedPlaceholders(saleObj);
      const query = `INSERT INTO sales_products (${columns}) VALUES (${placeholders})`;
      return connection.execute(query, [...Object.values(saleObj)]);
    });
    await Promise.all(insertPromises);
  }
  return {
    id: saleId,
    itemsSold: saleInfo,
  };
};

module.exports = {
  findAll,
  findById,
  insert,
};