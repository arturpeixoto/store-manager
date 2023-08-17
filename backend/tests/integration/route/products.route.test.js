const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const chaiHttp = require('chai-http');

const { expect } = chai;
chai.use(sinonChai);
chai.use(chaiHttp);

const app = require('../../../src/app');
const connection = require('../../../src/models/connection');
const { getProductsByIdFromDB, returnUpdateFromDB, updatedProductsByIdFromDB } = require('../mock/product.route.mock');

describe('Realizando teste de integração - PRODUCT ROUTE:', function () {
  it('Alterando nome do produto com sucesso', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([[getProductsByIdFromDB]])
      .onSecondCall()
      .resolves([returnUpdateFromDB])
      .onThirdCall()
      .resolves([[updatedProductsByIdFromDB]]);

    const responseBody = { id: 1, name: 'Cinto do Batman' };
    const requestBody = { name: 'Cinto do Batman' };
    
    const response = await chai.request(app).put('/products/1').send(requestBody);
  
    expect(response.body).to.be.deep.equal(responseBody);
    expect(response.status).to.be.equal(200);
  });
  it('Alterando nome do produto sem sucesso - produto não encontrado', async function () {
    sinon.stub(connection, 'execute')
      .onFirstCall()
      .resolves([[]]);

    const requestBody = { name: 'Cinto do Batman' };
    
    const response = await chai.request(app).put('/products/9').send(requestBody);
  
    expect(response.body).to.be.deep.equal({ message: 'Product not found' });
    expect(response.status).to.be.equal(404);
  });
  it('Alterando nome do produto sem sucesso - chave do body incorreta', async function () {
    const requestBody = { errado: 'Cinto do Batman' };
    
    const response = await chai.request(app).put('/products/1').send(requestBody);
  
    expect(response.body).to.be.deep.equal({ message: '"name" is required' });
    expect(response.status).to.be.equal(400);
  });
  it('Alterando nome do produto sem sucesso - nome do produto inválido', async function () {
    const requestBody = { name: 'Cint' };
    
    const response = await chai.request(app).put('/products/1').send(requestBody);
  
    expect(response.body).to.be.deep.equal({ message: '"name" length must be at least 5 characters long' });
    expect(response.status).to.be.equal(422);
  });
});