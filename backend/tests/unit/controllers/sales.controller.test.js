const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { getAllSalesFromService, getAllSalesFromModel, getSalesByIdFromService, getSalesByIdFromModel, insertSaleFromService } = require('../mocks/sales.mock');

describe('Realizando testes - SALES CONTROLLER:', function () {
  it('Resgatando todas as vendas com sucesso - status 200', async function () {
    sinon.stub(salesService, 'getAllSales').resolves(getAllSalesFromService);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await salesController.allSales(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getAllSalesFromModel);
  });

  it('Resgata as vendas com id = 1 com sucesso - status 200', async function () {
    sinon.stub(salesService, 'getSaleById').resolves(getSalesByIdFromService);
    const req = {
      params: { saleId: 1 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.saleById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getSalesByIdFromModel);
  });

  it('Resgata um produto com id = 4 sem com sucesso - status 404', async function () {
    sinon.stub(salesService, 'getSaleById').resolves({
      status: 'NOT_FOUND',
      message: 'Sale not found',
    });
    const req = {
      params: { productId: 4 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await salesController.saleById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(undefined);
  });

  it('Insere um produto com sucesso - status 201', async function () {
    sinon.stub(salesService, 'postNewSale').resolves(insertSaleFromService);
    const req = { body: [{ productId: 1, quantity: 1 }, { productId: 1, quantity: 5 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await salesController.newSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(insertSaleFromService.data);
  });

  it('Deleta um produto com sucesso - status 204', async function () {
    sinon.stub(salesService, 'eliminateSale').resolves({ status: 'NO_CONTENT' });

    const req = {
      params: { saleId: 1 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      end: sinon.stub(),
    };
    
    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledWith();
  });

  it('Deleta um produto sem sucesso - status 404', async function () {
    sinon.stub(salesService, 'eliminateSale').resolves({ status: 'NOT_FOUND', data: { message: 'Sale not found' } });

    const req = {
      params: { productId: 4 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
  });

  afterEach(function () {
    sinon.restore();
  });
});