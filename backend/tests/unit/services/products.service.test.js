const { expect } = require('chai');
const sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { getAllProductsFromModel, getProductsByIdFromModel } = require('../mocks/products.mock');
const { productsService } = require('../../../src/services');

describe('Realizando testes - PRODUCTS SERVICE', function () {
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

  afterEach(function () {
    sinon.restore();
  });
});