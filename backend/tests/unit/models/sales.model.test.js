const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { getAllSalesFromModel, getSalesByIdFromModel, insertSaleFromModel, returnDeleteSaleFromDB } = require('../mocks/sales.mock');

describe('Realizando testes - SALES MODEL:', function () {
  it('Recuperando todos as vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([getAllSalesFromModel]);

    const allSales = await salesModel.findAll();

    expect(allSales).to.be.an('array');
    expect(allSales).to.have.lengthOf(3);
    expect(allSales).to.be.deep.equal(getAllSalesFromModel);
  });

  it('Recuperando venda por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([getSalesByIdFromModel]);
    
    const inputData = 1;
    const sale = await salesModel.findById(inputData);

    expect(sale).to.be.an('array');
    expect(sale).to.be.deep.equal(getSalesByIdFromModel);
  });

  it('Criando uma venda com sucesso', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ insertId: 3 }])
      .onSecondCall()
      .resolves()
      .onThirdCall()
      .resolves();

      const inputData = [{ productId: 1, quantity: 1 }, { productId: 1, quantity: 5 }];
      const sale = await salesModel.insert(inputData);

      expect(sale).to.be.an('object');
      expect(sale).to.be.deep.equal(insertSaleFromModel);
  });

  it('Deletando uma venda com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(returnDeleteSaleFromDB);

    const saleId = 1;
     const result = await salesModel.eliminate(saleId);

    expect(result[0].affectedRows).to.be.equal(1);
    expect(result[0].info).to.be.equal('');
  });

  afterEach(function () {
    sinon.restore();
  });
});