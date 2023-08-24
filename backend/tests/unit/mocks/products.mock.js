const marteloString = 'Martelo de Thor';

const postProductIdFromDb = { insertId: 4 };

const getAllProductsFromModel = [
  { id: 1, name: marteloString },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const getProductsByIdFromModel = { id: 1, name: marteloString };

const getProductsBySearchQueryFromModel = [{ id: 1, name: marteloString }];

const updatedProductFromModel = { id: 1, name: 'Cinto do Batman' };

const updatedProductsFromService = {
  status: 'SUCCESSFUL',
  data: [
    { id: 1, name: 'Cinto do Batman' },
  ],
};

const getProductBySearchQueryFromService = {
  status: 'SUCCESSFUL',
  data: [
    { id: 1, name: marteloString },
  ],
};

const getInexistentProductBySearchQueryFromService = {
  status: 'SUCCESSFUL',
  data: [],
};

const getAllProductsFromService = {
  status: 'SUCCESSFUL',
  data: [
    { id: 1, name: marteloString },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' },
  ],
};

const getProductsByIdFromService = {
  status: 'SUCCESSFUL',
  data: [
    { id: 1, name: marteloString },
  ],
};

const postProductsFromModel = {
  id: 4,
  name: 'Cinto do Batman',
};

const postProductsFromService = {
  status: 'CREATED',
  data: {
    id: 4,
    name: 'Cinto do Batman',
} };

const returnFromDB = [
  {
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

const returnDeleteFromDB = [
  {
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
  },
  undefined,
];

module.exports = {
  postProductIdFromDb,
  getAllProductsFromModel,
  getProductsByIdFromModel,
  getAllProductsFromService,
  getProductsByIdFromService,
  postProductsFromModel,
  postProductsFromService,
  returnFromDB,
  returnDeleteFromDB,
  updatedProductFromModel,
  updatedProductsFromService,
  getProductsBySearchQueryFromModel,
  getProductBySearchQueryFromService,
  getInexistentProductBySearchQueryFromService,
};