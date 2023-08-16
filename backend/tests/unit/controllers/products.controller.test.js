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
  updatedProductsFromService, 
} = require('../mocks/products.mock');

const productNotFoundString = 'Product not found';

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
      message: productNotFoundString,
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

  it('Altera um produto com sucesso - status 204', async function () {
    sinon.stub(productsService, 'updatingProduct').resolves(updatedProductsFromService);

    const req = {
      params: { productId: 1 },
      body: { name: 'Cinto do Batman' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(updatedProductsFromService.data);
  });

  it('Altera um produto sem sucesso produto não encontrado - status 404 ', async function () {
    sinon.stub(productsService, 'updatingProduct').resolves({ status: 'NOT_FOUND', data: { message: productNotFoundString } });

    const req = {
      params: { productId: 4 },
      body: { name: 'Cinto do Batman' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: productNotFoundString });
  });

  it('Altera um produto sem sucesso body invalido - status 422', async function () {
    sinon.stub(productsService, 'updatingProduct').resolves({ 
      status: 'INVALID_VALUE',
      data: { message: '"name" length must be at least 5 characters long' },
    });

    const req = {
      params: { productId: 4 },
      body: { name: 'Cint' },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(422);
    expect(res.json).to.have.been.calledWith({ message: '"name" length must be at least 5 characters long' });
  });

  it('Deleta um produto com sucesso - status 204', async function () {
    sinon.stub(productsService, 'eliminateProduct').resolves({ status: 'NO_CONTENT' });

    const req = {
      params: { productId: 1 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      end: sinon.stub(),
    };
    
    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(204);
    expect(res.end).to.have.been.calledWith();
  });

  it('Deleta um produto sem sucesso - status 404', async function () {
    sinon.stub(productsService, 'eliminateProduct').resolves({ status: 'NOT_FOUND', data: { message: productNotFoundString } });

    const req = {
      params: { productId: 4 },
    };

    const res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };
    
    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: productNotFoundString });
  });

  afterEach(function () {
    sinon.restore();
  });
});