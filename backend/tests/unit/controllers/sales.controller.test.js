const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { salesService } = require('../../../src/services');
const { salesController } = require('../../../src/controllers');
const { getAllSalesFromService, getAllSalesFromModel, getSalesByIdFromService, getSalesByIdFromModel, insertSaleFromService, updatedSalesProductsFromService } = require('../mocks/sales.mock');

const saleNotFoundString = 'Sale not found';

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

  it('Resgata uma venda com id = 4 sem com sucesso - status 404', async function () {
    sinon.stub(salesService, 'getSaleById').resolves({
      status: 'NOT_FOUND',
      message: saleNotFoundString,
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

  it('Insere uma venda com sucesso - status 201', async function () {
    sinon.stub(salesService, 'postNewSale').resolves(insertSaleFromService);
    const req = { body: [{ productId: 1, quantity: 1 }, { productId: 1, quantity: 5 }] };
    const res = { status: sinon.stub().returnsThis(), json: sinon.stub() };
    await salesController.newSale(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(insertSaleFromService.data);
  });

  it('Deleta uma venda com sucesso - status 204', async function () {
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

  it('Deleta uma venda sem sucesso - status 404', async function () {
    sinon.stub(salesService, 'eliminateSale').resolves({ status: 'NOT_FOUND', data: { message: saleNotFoundString } });

    const req = {
      params: { productId: 4 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: saleNotFoundString });
  });

  it('Atualiza uma venda com sucesso - status 200', async function () {
    sinon.stub(salesService, 'updatingSalesProducts').resolves(updatedSalesProductsFromService);

    const req = {
      params: { saleId: 1, productId: 1 },
      body: { quantity: 4 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await salesController.changeSaleProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedSalesProductsFromService.data);
  });

  it('Atualiza uma venda sem sucesso - venda não encontrada - status 404', async function () {
    sinon.stub(salesService, 'updatingSalesProducts').resolves({ status: 'NOT_FOUND', data: { message: saleNotFoundString } });

    const req = {
      params: { saleId: 42, productId: 1 },
      body: { quantity: 4 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await salesController.changeSaleProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: saleNotFoundString });
  });

  it('Atualiza uma venda sem sucesso - produto não encontrado - status 404', async function () {
    sinon.stub(salesService, 'updatingSalesProducts').resolves({ status: 'NOT_FOUND', data: { message: 'Product not found in sale' } });

    const req = {
      params: { saleId: 1, productId: 42 },
      body: { quantity: 4 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await salesController.changeSaleProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found in sale' });
  });

  afterEach(function () {
    sinon.restore();
  });
});