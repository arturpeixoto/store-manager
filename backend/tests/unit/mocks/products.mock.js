const getAllProductsFromModel = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' },
  { id: 3, name: 'Escudo do Capitão América' },
];

const getProductsByIdFromModel = { id: 1, name: 'Martelo de Thor' };

const getProductsAllFromService = {
  status: 'SUCCESSFUL',
  data: [
    { id: 1, name: 'Martelo de Thor' },
    { id: 2, name: 'Traje de encolhimento' },
    { id: 3, name: 'Escudo do Capitão América' },
  ],
};

module.exports = {
  getAllProductsFromModel,
  getProductsByIdFromModel,
  getProductsAllFromService,
};