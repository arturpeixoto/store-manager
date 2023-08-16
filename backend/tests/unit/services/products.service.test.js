const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { getAllProductsFromModel, getProductsByIdFromModel, postProductsFromModel, updatedProductFromModel } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');

const inputBatman = 'Cinto do Batman';

describe('Realizando testes - PRODUCTS SERVICE:', function () {
  it('Recuperando todos os produtos', async function () {
    sinon.stub(productsModel, 'findAll').resolves(getAllProductsFromModel);
    const responseData = [
        { id: 1, name: 'Martelo de Thor' },
        { id: 2, name: 'Traje de encolhimento' },
        { id: 3, name: 'Escudo do Capitão América' },
      ];

    const responseService = await productsService.getAllProducts();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(responseData);
  });
  it('Recuperando todos os produtos, porém o banco está vazio', async function () {
    sinon.stub(productsModel, 'findAll').resolves([]);

    const responseService = await productsService.getAllProducts();
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data.message).to.deep.equal('There are no products');
  });

  it('Recuperando produto com sucesso com id = 1', async function () {
    sinon.stub(productsModel, 'findById').resolves(getProductsByIdFromModel);
    const responseData = { id: 1, name: 'Martelo de Thor' };

    const responseService = await productsService.getProductById(1);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Recuperando produto sem sucesso com id = 4', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const responseData = { message: 'Product not found' };

    const responseService = await productsService.getProductById(4);
    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Inserindo um produto com sucesso', async function () {
    sinon.stub(productsModel, 'insert').resolves(4);
    sinon.stub(productsModel, 'findById').resolves(postProductsFromModel);
    const inputData = inputBatman;
    const responseData = {
      id: 4,
      name: inputBatman,
    };

    const responseService = await productsService.insertNewProduct(inputData);
    expect(responseService.status).to.equal('CREATED');
    expect(responseService.data).to.deep.equal(responseData);
  });
  
  it('Inserindo um produto sem sucesso', async function () {
    const inputData = 'Cint';
  
    const responseService = await productsService.insertNewProduct(inputData);
    expect(responseService.status).to.equal('INVALID_VALUE');
    expect(responseService.data.message).to.deep.equal('"name" length must be at least 5 characters long');
  });

  it('Alterando um produto com sucesso', async function () {
    sinon.stub(productsModel, 'update').resolves();
    sinon.stub(productsModel, 'findById')
      .onFirstCall()
      .resolves(getProductsByIdFromModel)
      .onSecondCall()
      .resolves(updatedProductFromModel);
    const inputProductId = 1;
    const inputData = inputBatman;
    const responseData = {
      id: 1,
      name: inputBatman,
    };

    const responseService = await productsService.updatingProduct(inputProductId, inputData);
    expect(responseService.status).to.equal('SUCCESSFUL');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Alterando um produto sem sucesso - produto a ser atualizado não encontrado', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const inputData = inputBatman;
    const responseData = { message: 'Product not found' };
    const inputProductId = 1;

    const responseService = await productsService.updatingProduct(inputProductId, inputData);

    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Alterando um produto sem sucesso - nome inválido', async function () {
    sinon.stub(productsModel, 'findById').resolves(getProductsByIdFromModel);
    const inputData = 'Cint';
    const responseData = { message: '"name" length must be at least 5 characters long' };
    const inputProductId = 1;

    const responseService = await productsService.updatingProduct(inputProductId, inputData);
    expect(responseService.status).to.equal('INVALID_VALUE');
    expect(responseService.data).to.deep.equal(responseData);
  });

  it('Deletando um produto com sucesso', async function () {
    sinon.stub(productsModel, 'findById').resolves(getProductsByIdFromModel);
    sinon.stub(productsModel, 'eliminate').resolves();
    const inputProductId = 1;

    const responseService = await productsService.eliminateProduct(inputProductId);

    expect(responseService.status).to.equal('NO_CONTENT');
    expect(responseService.data).to.deep.equal();
  });

  it('Deletando um produto sem sucesso - produto a ser deletado não encontrado', async function () {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const responseData = { message: 'Product not found' };
    const inputProductId = 1;

    const responseService = await productsService.eliminateProduct(inputProductId);

    expect(responseService.status).to.equal('NOT_FOUND');
    expect(responseService.data).to.deep.equal(responseData);
  });

  afterEach(function () {
    sinon.restore();
  });
});