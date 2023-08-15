const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { getProductsByIdFromModel, getAllProductsFromModel } = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS MODEL:', function () {
  it('Recuperando todos os produtos com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([getAllProductsFromModel]);

    const allProducts = await productsModel.findAll();

    expect(allProducts).to.be.an('array');
    expect(allProducts).to.have.lengthOf(3);
    expect(allProducts).to.be.deep.equal(getAllProductsFromModel);
  });

  it('Recuperando product por id com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([[getProductsByIdFromModel]]);
    
    const inputData = 1;
    const product = await productsModel.findById(inputData);

    expect(product).to.be.an('object');
    expect(product).to.be.deep.equal(getProductsByIdFromModel);
  });

  afterEach(function () {
    sinon.restore();
  });
});