const getProductsByIdFromDB = { id: 1, name: 'Martelo de Thor' };

const returnUpdateFromDB = [{
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: 'Rows matched: 1  Changed: 1  Warnings: 0',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 1,
  },
  undefined,
];

const updatedProductsByIdFromDB = { id: 1, name: 'Cinto do Batman' };

const getAllProductsFromDB = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const insertIdFromDB = { insertId: 1 };

module.exports = {
  getProductsByIdFromDB,
  returnUpdateFromDB,
  updatedProductsByIdFromDB,
  getAllProductsFromDB,
  insertIdFromDB,
};