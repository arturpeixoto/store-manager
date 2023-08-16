const { expect } = require('chai');
const sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');
const { getAllSalesFromModel, getSalesByIdFromModel, insertSaleFromModel } = require('../mocks/sales.mock');
const { getProductsByIdFromModel } = require('../mocks/products.mock');

const mockDate = '2023-08-15T14:49:23.000Z';

describe('Realizando testes - SALES SERVICE:', function () {
  it('Recuperando todas as vendas ', async function () {
    sinon.stub(salesModel, 'findAll').resolves(getAllSalesFromModel);
    const responseData = [
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

    const responseService = await salesService.getAllSales();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(responseData);
  });
  it('Recuperando todos as vendas, porém o banco está vazio', async function () {
    sinon.stub(salesModel, 'findAll').resolves([]);

    const responseService = await salesService.getAllSales();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data.message).to.deep.equal('There are no sales');
  });

  it('Recuperando venda com sucesso com id = 1', async function () {
    sinon.stub(salesModel, 'findById').resolves(getSalesByIdFromModel);
    const responseData = [
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

    const responseService = await salesService.getSaleById(1);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Recuperando venda sem sucesso com id = 4', async function () {
    sinon.stub(salesModel, 'findById').resolves(undefined);
    const responseData = { message: 'Sale not found' };

    const responseService = await salesService.getSaleById(4);
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Criando uma venda com sucesso', async function () {
    sinon.stub(productsModel, 'findById')
      .onFirstCall()
      .resolves(getProductsByIdFromModel)
      .onSecondCall()
      .resolves(getProductsByIdFromModel);
    sinon.stub(salesModel, 'insert').resolves(insertSaleFromModel);
    const inputData = [{ productId: 1, quantity: 1 }, { productId: 1, quantity: 5 }];
    const responseService = await salesService.postNewSale(inputData);
    const responseData = { id: 3, itemsSold: [{ productId: 1, quantity: 1 }, { productId: 1, quantity: 5 }] };

    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Tentando criar uma venda, mas sem achar o produto', async function () {
    sinon.stub(productsModel, 'findById')
      .onFirstCall()
      .resolves(undefined)
      .onSecondCall()
      .resolves(getProductsByIdFromModel);
    const inputData = [{ productId: 4, quantity: 1 }, { productId: 1, quantity: 5 }];
    const responseService = await salesService.postNewSale(inputData);
    const responseData = { status: 'NOT_FOUND', data: { message: 'Product not found' } };

    expect(responseService.status).to.equal(responseData.status);
    expect(responseService.data).to.deep.equal(responseData.data);
  });

  afterEach(function () {
    sinon.restore();
  });
});