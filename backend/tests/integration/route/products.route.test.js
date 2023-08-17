const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const { getProductsByIdFromDB, returnUpdateFromDB, updatedProductsByIdFromDB, getAllProductsFromDB, insertIdFromDB } = require('../mock/product.route.mock');

const stringCintoDoBatman = 'Cinto do Batman';
const routeProduct1 = '/products/1';

describe('Realizando teste de integração - PRODUCT ROUTE:', function () {
  it('Resgatando todos os produtos', async function () {
    sinon.stub(connection, 'execute').resolves([getAllProductsFromDB]);

    const responseBody = [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ];
   
    const response = await chai.request(app).get('/products');
  
    expect(response.body).to.be.deep.equal(responseBody);
    expect(response.status).to.be.equal(200);
  });

  it('Resgatando todos os produtos - sem produtos cadastrados', async function () {
    sinon.stub(connection, 'execute').resolves([]);

    const responseBody = { message: 'There are no products' };
   
    const response = await chai.request(app).get('/products');
  
    expect(response.body).to.be.deep.equal(responseBody);
    expect(response.status).to.be.equal(200);
  });

  it('Resgatando produto com id existente ', async function () {
    sinon.stub(connection, 'execute').resolves([[getProductsByIdFromDB]]);

    const responseBody = { id: 1, name: 'Martelo de Thor' };
   
    const response = await chai.request(app).get(routeProduct1);
  
    expect(response.body).to.be.deep.equal(responseBody);
    expect(response.status).to.be.equal(200);
  });

  it('Resgatando produto com id inexistente ', async function () {
    sinon.stub(connection, 'execute').resolves([[]]);

    const responseBody = { message: 'Product not found' };
   
    const response = await chai.request(app).get('/products/99');
  
    expect(response.body).to.be.deep.equal(responseBody);
    expect(response.status).to.be.equal(404);
  });

  it('Inserindo produto com sucesso', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([{ insertIdFromDB }])
      .onSecondCall()
      .resolves([[getProductsByIdFromDB]]);

    const responseBody = { id: 1, name: 'Martelo de Thor' };
    const requestBody = { name: 'Martelo de Thor' };
    
    const response = await chai.request(app).post('/products/').send(requestBody);
  
    expect(response.body).to.be.deep.equal(responseBody);
    expect(response.status).to.be.equal(201);
  });

  it('Inserindo produto sem sucesso - chave do body incorreta', async function () {
    const responseBody = { message: '"name" is required' };
    const requestBody = { errado: stringCintoDoBatman };
    
    const response = await chai.request(app).post('/products/').send(requestBody);
  
    expect(response.body).to.be.deep.equal(responseBody);
    expect(response.status).to.be.equal(400);
  });

  it('Inserindo produto sem sucesso - nome incorreto', async function () {
    const requestBody = { name: 'asdf' };
    
    const response = await chai.request(app).post('/products/').send(requestBody);
  
    expect(response.body).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
    expect(response.status).to.be.equal(422);
  });

  it('Alterando nome do produto com sucesso', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([[getProductsByIdFromDB]])
      .onSecondCall()
      .resolves([returnUpdateFromDB])
      .onThirdCall()
      .resolves([[updatedProductsByIdFromDB]]);

    const responseBody = { id: 1, name: stringCintoDoBatman };
    const requestBody = { name: stringCintoDoBatman };
    
    const response = await chai.request(app).put(routeProduct1).send(requestBody);
  
    expect(response.body).to.be.deep.equal(responseBody);
    expect(response.status).to.be.equal(200);
  });

  it('Alterando nome do produto sem sucesso - produto não encontrado', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([[]]);

    const requestBody = { name: stringCintoDoBatman };
    
    const response = await chai.request(app).put('/products/9').send(requestBody);
  
    expect(response.body).to.be.deep.equal({ message: 'Product not found' });
    expect(response.status).to.be.equal(404);
  });

  it('Alterando nome do produto sem sucesso - chave do body incorreta', async function () {
    const requestBody = { errado: stringCintoDoBatman };
    
    const response = await chai.request(app).put(routeProduct1).send(requestBody);
  
    expect(response.body).to.be.deep.equal({ message: '"name" is required' });
    expect(response.status).to.be.equal(400);
  });

  it('Alterando nome do produto sem sucesso - nome do produto inválido', async function () {
    const requestBody = { name: 'Cint' };
    
    const response = await chai.request(app).put(routeProduct1).send(requestBody);
  
    expect(response.body).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
    expect(response.status).to.be.equal(422);
  });

  afterEach(function () {
    sinon.restore();
  });
});