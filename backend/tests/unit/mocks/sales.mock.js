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

const getAllSalesFromService = {
  status: 'SUCCESSFUL',
  data: [
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
  ],
};

const getSalesByIdFromService = {
  status: 'SUCCESSFUL',
  data: [
    { productId: 1, quantity: 5, date: mockDate },
    { productId: 2, quantity: 10, date: mockDate },
  ],
};

const insertSaleFromModel = {
  id: 3,
  itemsSold: [
    {
      productId: 1,
      quantity: 1,
    },
    {
      productId: 1,
      quantity: 5,
    },
  ],
};

const insertSaleFromService = { 
  status: 'CREATED', 
  data: 
  { 
    id: 3, 
    itemsSold: [
      { productId: 1, quantity: 1 }, 
      { productId: 1, quantity: 5 },
    ], 
  }, 
};

const returnDeleteSaleFromDB = [{
    fieldCount: 0,
    affectedRows: 1,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
  },
  undefined,
];

const returnUpdateNewDateFromDB = [{
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

const returnUpdateQuantityFromDB = [{
  fieldCount: 0,
  affectedRows: 1,
  insertId: 0,
  info: 'Rows matched: 1  Changed: 0  Warnings: 0',
  serverStatus: 2,
  warningStatus: 0,
  changedRows: 0,
},
undefined,
];

const returnUpdatedSelectFromDB = {
  productId: 1,
  quantity: 4,
  date: mockDate,
  saleId: 1,
};

const updatedSalesProductsFromModel = {
  productId: 1,
  quantity: 4,
  date: mockDate,
  saleId: 1,
};

const updatedSalesProductsFromService = {
  status: 'SUCCESSFUL',
  data: 
  {
    productId: 1,
    quantity: 4,
    date: mockDate,
    saleId: 1,
  },
};

module.exports = { 
  getAllSalesFromModel,
  getSalesByIdFromModel, 
  getAllSalesFromService,
  getSalesByIdFromService,
  insertSaleFromModel,
  insertSaleFromService,
  returnDeleteSaleFromDB,
  returnUpdateNewDateFromDB,
  returnUpdatedSelectFromDB,
  returnUpdateQuantityFromDB,
  updatedSalesProductsFromModel,
  updatedSalesProductsFromService,
};