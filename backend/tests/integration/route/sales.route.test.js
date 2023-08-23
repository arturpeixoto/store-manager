/* const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const { getAllSalesFromDB, getSaleByIdFromDB, insertNewSaleFromDB } = require('../mock/sales.routes.mock');
const { salesModel, productsModel } = require('../../../src/models');

const salesRoute = '/sales';
const saleWithIdRoute = '/sales/1';
const dateMock = '2023-08-18T15:18:03.000Z';

describe('Realizando teste de integração - SALES ROUTE: ', function () {
  it('Resgatando todas as vendas', async function () {
    sinon.stub(connection, 'execute').resolves([getAllSalesFromDB]);

    const responseBody = [
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

    const response = await chai.request(app).get(salesRoute);

    expect(response.body).to.be.deep.equal(responseBody);
    expect(response.status).to.be.equal(200);
  });

  it('Resgatando todas as vendas - sem vendas cadastradas', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const responseBody = { message: 'There are no sales' };

    const response = await chai.request(app).get(salesRoute);

    expect(response.body).to.be.deep.equal(responseBody);
    expect(response.status).to.be.equal(200);
  });

  it('Resgatando venda com id existente', async function () {
    sinon.stub(connection, 'execute').resolves([getSaleByIdFromDB]);

    const responseBody = [
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

    const response = await chai.request(app).get(saleWithIdRoute);

    expect(response.body).to.be.deep.equal(responseBody);
    expect(response.status).to.be.equal(200);
  });

  it('Resgatando venda com id inexistente', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const responseBody = { message: 'Sale not found' };

    const response = await chai.request(app).get(saleWithIdRoute);

    expect(response.body).to.be.deep.equal(responseBody);
    expect(response.status).to.be.equal(404);
  });

  it('Inserindo venda com sucesso', async function () {
    sinon.stub(productsModel, 'findMultipleById')
      .resolves([
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
      ]);
    sinon.stub(salesModel, 'insert')
      .resolves(insertNewSaleFromDB);

      const requestBody = [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }];

      const responseData = { id: 3, itemsSold: [{ productId: 1, quantity: 1 }, { productId: 2, quantity: 5 }] };

      const response = await chai.request(app).post(salesRoute).send(requestBody);
      expect(response.body).to.be.deep.equal(responseData);
      expect(response.status).to.be.equal(201);
  });

  it('Inserindo venda sem sucesso - produto não encontrado', async function () {
    sinon.stub(productsModel, 'findMultipleById')
      .resolves([
        { id: 1, name: 'Martelo de Thor' },
        undefined,
      ]);
    sinon.stub(salesModel, 'insert')
      .resolves(insertNewSaleFromDB);

      const requestBody = [{ productId: 1, quantity: 1 }, { productId: 4, quantity: 5 }];

      const responseData = { message: 'Product not found' };

      const response = await chai.request(app).post(salesRoute).send(requestBody);
      expect(response.body).to.be.deep.equal(responseData);
      expect(response.status).to.be.equal(404);
  });

  it('Inserindo venda sem sucesso - quantidade menor que 1', async function () {
      const requestBody = [{ productId: 1, quantity: -1 }, { productId: 4, quantity: 5 }];

      const responseData = { message: '"quantity" must be greater than or equal to 1' };

      const response = await chai.request(app).post(salesRoute).send(requestBody);
      expect(response.body).to.be.deep.equal(responseData);
      expect(response.status).to.be.equal(422);
  });

  it('Inserindo venda sem sucesso - chave quantity errada', async function () {
    const requestBody = [{ productId: 1, quantty: 1 }, { productId: 4, quantity: 5 }];

    const responseData = { message: '"quantity" is required' };

    const response = await chai.request(app).post(salesRoute).send(requestBody);
    expect(response.body).to.be.deep.equal(responseData);
    expect(response.status).to.be.equal(400);
  });

  it('Inserindo venda sem sucesso - chave productId errada', async function () {
    const requestBody = [{ produtId: 1, quantity: 1 }, { productId: 4, quantity: 5 }];

    const responseData = { message: '"productId" is required' };

    const response = await chai.request(app).post(salesRoute).send(requestBody);
    expect(response.body).to.be.deep.equal(responseData);
    expect(response.status).to.be.equal(400);
  });
  
  afterEach(function () {
    sinon.restore();
  });
}); */