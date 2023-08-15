const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;
chai.use(sinonChai);

const { productsService } = require('../../../src/services');
const { productsController } = require('../../../src/controllers');
const { 
  getAllProductsFromService,
  getAllProductsFromModel,
  getProductsByIdFromService,
  getProductsByIdFromModel,
  postProductsFromService, 
} = require('../mocks/products.mock');

describe('Realizando testes - PRODUCTS CONTROLLER:', function () {
  it('Resgatando todos produtos com sucesso - status 200', async function () {
    sinon.stub(productsService, 'getAllProducts').resolves(getAllProductsFromService);
    const req = {};
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.allProducts(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(getAllProductsFromModel);
  });

  it('Resgata um produto com id = 1 com sucesso - status 200', async function () {
    sinon.stub(productsService, 'getProductById').resolves(getProductsByIdFromService);
    const req = {
      params: { productId: 1 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.productById(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith([getProductsByIdFromModel]);
  });

  it('Resgata um produto com id = 42 sem com sucesso - status 404', async function () {
    sinon.stub(productsService, 'getProductById').resolves({
      status: 'NOT_FOUND',
      message: 'Product not found',
    });
    const req = {
      params: { productId: 4 },
      body: { },
    };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    await productsController.productById(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith(undefined);
  });

  it('Cria um produto com sucesso - status 201', async function () {
    sinon.stub(productsService, 'insertNewProduct').resolves(postProductsFromService);

    const req = { body: { name: 'Cinto do Batman' } };
    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.createProduct(req, res);
    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(postProductsFromService.data);
  });

  afterEach(function () {
    sinon.restore();
  });
});