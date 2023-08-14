const { salesModel } = require('../models');

const getAllSales = async () => {
  let data = await salesModel.findAll();
  if (!data || data.length === 0) data = { message: 'There are no sales' };
  return { status: 'SUCCESSFUL', data };
};

const getSaleById = async (saleId) => {
  const data = await salesModel.findById(saleId);
  if (!data || data.length === 0) {
  return { 
    status: 'NOT_FOUND', 
    data: { message: 'Sale not found' }, 
  }; 
}

  return { status: 'SUCCESSFUL', data };
};

module.exports = { 
  getAllSales,
  getSaleById,
};