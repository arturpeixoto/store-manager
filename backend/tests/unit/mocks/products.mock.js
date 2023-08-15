const getAllProductsFromModel = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const getProductsByIdFromModel = { id: 1, name: 'Martelo de Thor' };

const getAllProductsFromService = {
  status: 'SUCCESSFUL',
  data: [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' },
  ],
};

const getProductsByIdFromService = {
  status: 'SUCCESSFUL',
  data: [
    { id: 1, name: 'Martelo de Thor' },
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

module.exports = {
  getAllProductsFromModel,
  getProductsByIdFromModel,
  getAllProductsFromService,
  getProductsByIdFromService,
  postProductsFromModel,
  postProductsFromService,
};