const dateMock = '2023-08-18T15:18:03.000Z';

const getAllSalesFromDB = [
  {
    saleId: 1,
    productId: 1,
    quantity: 5,
    date: dateMock,
  },
  {
    saleId: 1,
    productId: 2,
    quantity: 10,
    date: dateMock,
  },
  {
    saleId: 2,
    productId: 3,
    quantity: 15,
    date: dateMock,
  },
];

const getSaleByIdFromDB = [
  {
    productId: 1,
    quantity: 5,
    date: dateMock,
  },
  {
    productId: 2,
    quantity: 10,
    date: dateMock,
  },
];

const insertNewSaleFromDB = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 2,
      quantity: 5,
    },
  ],
};

module.exports = {
  getAllSalesFromDB,
  getSaleByIdFromDB,
  insertNewSaleFromDB,
};