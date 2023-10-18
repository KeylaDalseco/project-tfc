import * as sinon from 'sinon';
import * as chai from 'chai';
import * as jwt from "jsonwebtoken";

// @ts-ignore
import chaiHttp = require('chai-http');

import { App } from '../app';
import SequelizeMatches from '../database/models/SequelizeMatches';
import { 
  match,
  matches,
  matchesInvalidId,
  matchesWithoutHomeId,
  matchesWithoutId,
  matchesUpdate } from './mocks/Matches.mocks';
import SequelizeTeam from '../database/models/SequelizeTeams';
import MatchService from '../services/MatchService';


chai.use(chaiHttp);

const { app } = new App();

const { expect } = chai;

describe('Match test', function() {

  it('Return all matches', async function() {
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any);

    const { status, body } = await chai.request(app).get('/matches');

    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('should return a match by id', async function() {
    sinon.stub(SequelizeMatches, 'findOne').resolves(match as any);

    const { status, body } = await chai.request(app).get('/matches/1');    

    expect(status).to.equal(200);
    expect(body).to.deep.equal(match);
  });

  it('should return null if not a match by id', async function() {
    sinon.stub(SequelizeMatches, 'findOne').resolves(null);

    const { status, body } = await chai.request(app).get('/matches/1');

    expect(status).to.equal(404);
    expect(body).to.deep.equal({ message: 'match 1 not found'});
  });

  it('testing whether it is possible to update progress', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves([1] as any);
    // sinon.stub(SequelizeMatches, 'findByPk').resolves(updateMatch as any);
    sinon.stub(jwt, 'verify').resolves();
    
    const { status, body } = await chai.request(app)
    .patch('/matches/1/finish')
    .set('authorization', 'validToken')
    .send({ message: "Finished" });

    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: "Finished" });
  });

  it('testing it is not possible to update progress without a valid token', async function() {
    sinon.stub(SequelizeMatches, 'update').resolves([1] as any);
    
    const { status, body } = await chai.request(app)
    .patch('/matches/1/finish')
    .set('authorization', 'invalidToken')
    .send({ message: "Finished" });

    expect(status).to.equal(401);
    expect(body).to.deep.equal({ message: "Token must be a valid token" });
  });

  it('should create a Match', async function() {
    sinon.stub(SequelizeMatches, 'create').resolves(matchesWithoutId as any);
    sinon.stub(jwt, 'verify').resolves();
    
    const { status, body } = await chai.request(app)
    .post('/matches')
    .set('authorization', 'validToken')
    .send(match);
    

    expect(status).to.equal(201);
    expect(body).to.deep.equal(matchesWithoutId);
  });

  it('You should not create a match if id is invalid', async function() {
    sinon.stub(SequelizeMatches, 'create').resolves(matchesInvalidId as any);
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    sinon.stub(jwt, 'verify').resolves();
    
    const { status, body } = await chai.request(app)
    .post('/matches')
    .set('authorization', 'validToken')
    .send();

    expect(status).to.equal(422);
    expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('You should not create a match if id is invalid', async function() {
    sinon.stub(SequelizeMatches, 'create').resolves(matchesWithoutHomeId as any);
    sinon.stub(SequelizeTeam, 'findByPk').resolves(null);
    sinon.stub(jwt, 'verify').resolves();
    
    const { status, body } = await chai.request(app)
    .post('/matches')
    .set('authorization', 'validToken')
    .send({ message: 'There is no team with such id!' });

    expect(status).to.equal(422);
    expect(body).to.deep.equal({ message: 'It is not possible to create a match with two equal teams' });
  });

  it('testing the matchInProgress function', async function() {
    const matchService = new MatchService();

    sinon.stub(matchService, 'matchInProgress').resolves( matches as any);
    sinon.stub(SequelizeMatches, 'findAll').resolves(matches as any)
    sinon.stub(jwt, 'verify').resolves();
    
    const { status, body } = await chai.request(app)
    .get('/matches?inProgress=true')
    .set('authorization', 'validToken')
    .send(matches);
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal(matches);
  });

  it('testing the updateMatchPoints function', async function() {
    const matchService = new MatchService();

    sinon.stub(matchService, 'updateMatchPoints').resolves( { message: 'Match updated' } as any);
    sinon.stub(SequelizeMatches, 'findByPk').resolves( matchesUpdate as any)
    sinon.stub(jwt, 'verify').resolves();
    
    const { status, body } = await chai.request(app)
    .patch('/matches/1')
    .set('authorization', 'validToken')
    .send({ message: 'Match updated' });
    console.log(status, body);
    
    
    expect(status).to.equal(200);
    expect(body).to.deep.equal({ message: 'Match updated' });
  });
  afterEach(sinon.restore);
})