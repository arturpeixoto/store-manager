const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { salesModel } = require('../../../src/models');
const { getAllSalesFromModel, getSalesByIdFromModel } = require('../mocks/sales.mock');

describe('Realizando testes - SALES MODEL:', function () {
  it('Recuperando todos as vendas com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([getAllSalesFromModel]);

    const allSales = await salesModel.findAll();

    expect(allSales).to.be.an('array');
    expect(allSales).to.have.lengthOf(3);
    expect(allSales).to.be.deep.equal(getAllSalesFromModel);
  });

  it('Recuperando product por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([getSalesByIdFromModel]);
    
    const inputData = 1;
    const product = await salesModel.findById(inputData);

    expect(product).to.be.an('array');
    expect(product).to.be.deep.equal(getSalesByIdFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});