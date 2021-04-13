// https://mochajs.org/
// https://www.chaijs.com
// https://www.chaijs.com/plugins/chai-http
// https://sinonjs.org/releases/v10.0.1

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { server, io } = require('../../index');
const db = require('../../db');

const Message = require('../../db/models/message');
const { expect } = require('chai');

constexpect = chai.expect;

chai.use(chaiHttp);

describe('APIs', () => {
  beforeEach((done) => {
    db.collections.messages.drop(() => {
      done();
    });
  });

  it('GET /messages - empty case', (done) => {
    chai
      .request(server)
      .get('/messages')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body.length).to.equal(0);
        done();
      });
  });

  it('POST /messages', (done) => {
    // https://sinonjs.org/releases/latest/spies
    const sandbox = sinon.createSandbox();
    sandbox.spy(io, 'emit');

    chai
      .request(server)
      .post('/messages')
      .send({ userId: 'test user', body: 'hello from tests' })
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res.body._id).to.exist;
        expect(res.body.createdAt).to.exist;
        expect(res.body.updatedAt).to.exist;

        expect(io.emit.getCall(0).args[0]).to.equal('message');
        expect(io.emit.getCall(0).args[1].userId).to.equal('test user');
        expect(io.emit.getCall(0).args[1].body).to.equal('hello from tests');
        sandbox.restore();
        done();
      });
  });

  it('GET /messages', (done) => {
    const message = new Message({ userId: 'Bob Brown', body: 'Hi there!' });

    message.save((err) => {
      chai
        .request(server)
        .get('/messages')
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res.body.length).to.equal(1);

          expect(res.body[0].userId).to.equal('Bob Brown');
          expect(res.body[0].body).to.equal('Hi there!');
          done();
        });
    });
  });
});
