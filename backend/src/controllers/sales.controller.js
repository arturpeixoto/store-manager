const { salesService } = require('../services');
const mapStatusHTTP = require('../utils/mapStatusHTTP');

const allSales = async (_req, res) => {
  const { status, data } = await salesService.getAllSales();
  return res.status(mapStatusHTTP(status)).json(data);
};

const saleById = async (req, res) => {
  const { id } = req.params;
  const { status, data } = await salesService.getSaleById(id);
  return res.status(mapStatusHTTP(status)).json(data);
};

const newSale = async (req, res) => {
  const saleInfo = req.body;
  const { status, data } = await salesService.postNewSale(saleInfo);
  return res.status(mapStatusHTTP(status)).json(data);
};

module.exports = {
  allSales,
  saleById,
  newSale,
};