const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../src/models/connection');
const { productsModel } = require('../../../src/models');
const { getProductsByIdFromModel, getAllProductsFromModel, postProductIdFromDb, returnFromDB, returnDeleteFromDB } = require('../mocks/products.mock');

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

  it('Inserindo um novo produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves([postProductIdFromDb]);

    const inputData = 'Cinto do Batman';
    const insertId = await productsModel.insert(inputData);

    expect(insertId).to.be.a('number');
    expect(insertId).to.equal(4);
  });

  it('Alterando produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(returnFromDB);

    const productId = 1;
    const inputData = { name: 'Cinto do Batman' };
    const result = await productsModel.update(productId, inputData);

    expect(result[0].affectedRows).to.be.equal(1);
    expect(result[0].changedRows).to.be.equal(1);
  });

  it('Deletando produto com sucesso', async function () {
    sinon.stub(connection, 'execute').resolves(returnDeleteFromDB);

    const productId = 1;
    const result = await productsModel.eliminate(productId);

    expect(result[0].affectedRows).to.be.equal(1);
    expect(result[0].info).to.be.equal('');
  });

  afterEach(function () {
    sinon.restore();
  });
});