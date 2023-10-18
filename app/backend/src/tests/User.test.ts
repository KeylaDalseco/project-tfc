import * as sinon from 'sinon';
import * as chai from 'chai';

// @ts-ignore
import chaiHttp = require('chai-http');
import { App } from '../../src/app';
import { invalidEmailLoginBody, invalidPasswordLoginBody,
  validLoginBody } from './mocks/User.mocks';
import JWT from '../../src/utils/JWT';
import Validations from '../../src/middleware/Validations';

// @ts-ignore

chai.use(chaiHttp);

const { expect } = chai;

const { app } = new App();


describe('Login Test', function() {
  it('shouldn\'t login with an invalid body data', async function() {
    const { status, body } = await chai.request(app).post('/login')
      .send({});

    expect(status).to.equal(400);
    expect(body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('shouldn\'t login with an invalid email', async function() {
    const { status, body } = await chai.request(app).post('/login')
      .send(invalidEmailLoginBody);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('shouldn\'t login with an invalid password', async function() {
    const { status, body } = await chai.request(app).post('/login')
      .send(invalidPasswordLoginBody);

    expect(status).to.equal(401);
    expect(body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('should return a token when login is done', async function() {
    sinon.stub(JWT, 'sign').returns('validToken');
    sinon.stub(Validations, 'validateUser').returns();

    const { status, body } = await chai.request(app)
      .post('/login')
      .send(validLoginBody);

    expect(status).to.equal(200);
    expect(body).to.have.key('token');
  });
  it('test the token validation function', async function() {
    sinon.stub(JWT, 'verify').resolves();
    sinon.stub(Validations, 'validateToken').returns({role: "admin"} as any);

    const { status } = await chai.request(app)
      .get('/login/role')
      .set({ Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTY5NjI1NDk2NiwiZXhwIjoxNjk3MTE4OTY2fQ.RMveyRrpEJqExQOkOEVtsVQ_EfctK5v0BVBleits40Y' })
      .send({role: "admin"});

    expect(status).to.equal(200);
  });

  afterEach(sinon.restore); 
});
