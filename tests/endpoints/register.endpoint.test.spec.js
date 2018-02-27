const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const { assert, expect } = chai;
const Server = require('../../server.js');
const server = new Server();

server.run();

const app = server.express;
const path = '/api/auth/register';

chai.use(chaiHttp);

describe('Register endpoint', () => {
  const req = chai.request(app);
  const errors = {
    empty: {
      email: 'Field email is required!',
      password: 'Field password is required!',
      firstName: 'Field firstName is required!',
      lastName: 'Field firstName is required!'
    },
    fail: {
      email: 'Invalid email address!',
      passwordIsNotString: 'Password field must be string!',
      passwordMinLength:
        'Invalid password length. Min value must have 6 letter!',
      emailIsExists: 'Email is exists!'
    }
  };

  it('request data is empty', done => {
    const data = {};

    req
      .post(path)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        const { status, body } = res;

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('messages');

        res.body.messages.should.have.property('email').eql(errors.empty.email);

        res.body.messages.should.have
          .property('password')
          .eql(errors.empty.password);

        res.body.messages.should.have
          .property('firstName')
          .eql(errors.empty.firstName);

        res.body.messages.should.have
          .property('lastName')
          .eql(errors.empty.lastName);

        done();
      });
  });

  it('request data with only email', done => {
    const data = { emal: 'test@gmail.com' };

    req
      .post(path)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        const { status, body } = res;

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('messages');

        res.body.messages.should.have
          .property('password')
          .eql(errors.empty.password);

        res.body.messages.should.have
          .property('firstName')
          .eql(errors.empty.firstName);

        res.body.messages.should.have
          .property('lastName')
          .eql(errors.empty.lastName);

        done();
      });
  });

  it('request data with email and password', done => {
    const data = { emal: 'test@gmail.com', password: '123456' };

    req
      .post(path)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        const { status, body } = res;

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('messages');

        res.body.messages.should.have
          .property('firstName')
          .eql(errors.empty.firstName);

        res.body.messages.should.have
          .property('lastName')
          .eql(errors.empty.lastName);

        done();
      });
  });

  it('request data with invalid email', done => {
    const data = {
      email: 'test',
      password: '123456',
      firstName: 'test',
      lastName: 'test'
    };

    req
      .post(path)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        const { status, body } = res;

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('messages');
        res.body.messages.should.have.property('email').eql(errors.fail.email);

        done();
      });
  });

  it('request data with a password is not string', done => {
    const data = {
      email: 'test@gmail.com',
      password: 123456,
      firstName: 'test',
      lastName: 'test'
    };

    req
      .post(path)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        const { status, body } = res;

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('messages');
        res.body.messages.should.have
          .property('password')
          .eql(errors.fail.passwordIsNotString);

        done();
      });
  });

  it('request data with invalid password length', done => {
    const data = {
      email: 'test@gmail.com',
      password: '123',
      firstName: 'test',
      lastName: 'test'
    };

    req
      .post(path)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        const { status, body } = res;

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('messages');
        res.body.messages.should.have
          .property('password')
          .eql(errors.fail.passwordMinLength);

        done();
      });
  });

  const dateTime = new Date().getTime();

  it('success register', done => {
    const data = {
      email: `test${dateTime}@gmail.com`,
      password: '123456',
      firstName: 'test',
      lastName: 'test'
    };

    req
      .post(path)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        const { status, body } = res;

        res.should.have.status(200);
        res.body.should.be.a('object');
        res.body.should.have.property('token').a('string');

        done();
      });
  });
  it('email is exists', done => {
    const data = {
      email: `test${dateTime}@gmail.com`,
      password: '123456',
      firstName: 'test',
      lastName: 'test'
    };

    req
      .post(path)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        const { status, body } = res;

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('messages');
        res.body.messages.should.have
          .property('email')
          .eql(errors.fail.emailIsExists);

        done();
      });
  });
});
