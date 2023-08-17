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

module.exports = {
  getProductsByIdFromDB,
  returnUpdateFromDB,
  updatedProductsByIdFromDB,
};