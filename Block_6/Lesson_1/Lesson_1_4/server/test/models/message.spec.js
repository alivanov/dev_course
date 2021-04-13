const chai = require('chai');

const Message = require('../../db/models/message');

const { expect } = chai;

describe('Message model', () => {
  it('should be invalid if body is empty', (done) => {
    const m = new Message({
      userId: 'John Doe',
    });

    m.validate((err) => {
      expect(err.errors.body).to.exist;
      done();
    });
  });

  it('should be invalid if userId is empty', (done) => {
    const m = new Message({
      body: 'hello!',
    });

    m.validate((err) => {
      expect(err.errors.userId).to.exist;
      done();
    });
  });

  it('should create valid message model', (done) => {
    const m = new Message({
      userId: 'John Doe',
      body: 'hello!',
    });

    m.validate((err) => {
      expect(err).to.not.exist;
      expect(m._id).to.exist;
      done();
    });
  });
});
