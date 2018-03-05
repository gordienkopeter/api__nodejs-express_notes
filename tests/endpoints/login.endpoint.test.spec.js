const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const { assert, expect } = chai;
const Server = require('../../server.js');
const server = new Server();

server.run();

const app = server.express;
const path = '/api/auth/login';

chai.use(chaiHttp);

describe('Login endpoint', () => {
  const req = chai.request(app);
  const errors = {
    empty: {
      email: 'Field email is required!',
      password: 'Field password is required!'
    },
    fail: {
      email: 'Invalid email address!',
      emailIsNotExists: 'Email is not exists!',
      passwordIsNotString: 'Password field must be string!',
      passwordMinLength: 'Invalid password length. Min value must have 6 letter!',
      passwordNotMatch: 'Passwords did not match!'
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

        res.body.messages.should.have.property('password').eql(errors.empty.password);

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

        res.body.messages.should.have.property('password').eql(errors.empty.password);

        done();
      });
  });

  it('request data with invalid email', done => {
    const data = { email: 'test', password: '123456' };

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
    const data = { email: 'test@gmail.com', password: 123456 };

    req
      .post(path)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        const { status, body } = res;

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('messages');
        res.body.messages.should.have.property('password').eql(errors.fail.passwordIsNotString);

        done();
      });
  });

  it('request data with a password is not string', done => {
    const data = { email: 'test@gmail.com', password: 123456 };

    req
      .post(path)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        const { status, body } = res;

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('messages');
        res.body.messages.should.have.property('password').eql(errors.fail.passwordIsNotString);

        done();
      });
  });

  it('request data with invalid password length', done => {
    const data = { email: 'test@gmail.com', password: '123' };

    req
      .post(path)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        const { status, body } = res;

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('messages');
        res.body.messages.should.have.property('password').eql(errors.fail.passwordMinLength);

        done();
      });
  });

  it('passwords did not match', done => {
    const email = `test${dateTime}@gmail.com`;
    const password = '123456';
    let data = { email, password, firstName: 'test', lastName: 'test' };

    req
      .post('/api/auth/register')
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        data = { email, password: '123234234' };
        req
          .post(path)
          .set('Accept', 'application/json')
          .send(data)
          .end((err, res) => {
            const { status, body } = res;

            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('messages');
            res.body.messages.should.have.property('password').eql(errors.fail.passwordNotMatch);

            done();
          });
      });

    req
      .post(path)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {});
  });

  const dateTime = new Date().getTime();

  it('email is not exists', done => {
    const data = { email: `test_ew-wer-234234234@gmail.com` };

    req
      .post(path)
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        const { status, body } = res;

        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('messages');
        res.body.messages.should.have.property('email').eql(errors.fail.emailIsNotExists);

        done();
      });
  });

  it('success login', done => {
    const email = `test${dateTime}@gmail.com`;
    const password = '123456';
    let data = { email, password, firstName: 'test', lastName: 'test' };

    req
      .post('/api/auth/register')
      .set('Accept', 'application/json')
      .send(data)
      .end((err, res) => {
        data = { email, password };
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
  });
});
