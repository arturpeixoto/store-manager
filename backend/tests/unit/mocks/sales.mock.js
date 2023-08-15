const mockDate = '2023-08-15T14:49:23.000Z';

const getAllSalesFromModel = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: mockDate,
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: mockDate,
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: mockDate,
  },
];

const getSalesByIdFromModel = [
  {
    productId: 1,
    quantity: 5,
    date: mockDate,
  },
  {
    productId: 2,
    quantity: 10,
    date: mockDate,
  },
];

module.exports = { 
  getAllSalesFromModel,
  getSalesByIdFromModel, 
};