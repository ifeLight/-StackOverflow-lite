import chai, { should, expect, assert} from 'chai';
import chaiHttp from 'chai-http';

import db from '../config/db';
import server from '../server';

chai.use(chaiHttp)
should();

describe('Testing V1 API Authentication', () => {
  let token, questionId, answerId;
  const postQuestionFields = {
    title : "Great Question",
    content : "Testing greater questions"
  }
  const postAnswerFields = {
    content : 'My answer is very correct'
  }
  const loginDetails = {
    email : 'ifelight@mail.com',
    password : 'Success101.',
    displayName : 'Ifelight'
  }

    before('Cleaning Up Users in the Database', async () => {
            const client = await db.connect();
            try {
              await client.query('DELETE FROM votes;');
              //await client.query('DELETE FROM comments;');
              await client.query('DELETE FROM answers;');
              await client.query('DELETE FROM questions;');
              await client.query('DELETE FROM users;'); 
            } catch (err) {
              console.error(err.stack);
            } finally {
              client.release();
            }
          })

  after('Cleaning Up Users in the Database', async () => {
    const client = await db.connect();
    try {
      await client.query('DELETE FROM votes;');
      //await client.query('DELETE FROM comments;');
      await client.query('DELETE FROM answers;');
      await client.query('DELETE FROM questions;');
      await client.query('DELETE FROM users;'); 
    } catch (err) {
      console.error(err.stack);
    } finally {
      client.release();
    }
  })

    describe('Register /POST', () => {
        it('It should successfully register a user and return a token', (done) => {
          chai.request(server)
            .post('/api/v1/auth/signup')
            .send(loginDetails)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('auth');
              res.body.should.have.property('token').length.greaterThan(15);
              done();
            })
        })
    })

    describe('Login /POST', () => {
      it('It should be ale to login a user and return a token', (done) => {
        chai.request(server)
            .post('/api/v1/auth/login')
            .send(loginDetails)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('auth');
              res.body.should.have.property('token').length.greaterThan(15);
              token = res.body.token;
              done();
            })
      })
    })

    describe('Add Question /POST', () => {
      it('Should be able to post a question', (done) => {
        //console.log('Token: ', token);
        chai.request(server)
            .post('/api/v1/questions')
            .set('x-access-token', token)
            .send(postQuestionFields)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('title');
              res.body.data.should.have.property('content');
              res.body.data.should.have.property('createdOn');
              res.body.data.should.have.property('questionId');
              questionId = Number(res.body.data.questionId);
              done();
            })
      })
    })

    describe('Add Question /POST', () => {
      it('Should be able to post a question', (done) => {
        //console.log('Token: ', token);
        chai.request(server)
            .post('/api/v1/questions')
            .set('x-access-token', token)
            .send(postQuestionFields)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('title');
              res.body.data.should.have.property('content');
              res.body.data.should.have.property('createdOn');
              res.body.data.should.have.property('questionId');
              questionId = Number(res.body.data.questionId);
              done();
            })
      })
    })

    describe('GET Questions /GET', () => {
      it('Should be able to retrieve all questions', (done) => {
        //console.log('Token: ', token);
        chai.request(server)
            .get('/api/v1/questions')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.data.should.be.a('array');
              res.body.should.have.property('limit');
              res.body.should.have.property('page');
              res.body.should.have.property('page');
              res.body.should.have.property('message');
              done();
            })
      })
    })

    describe('GET a Question /GET', () => {
      it('Should be able to retrieve a question with questionId', (done) => {
        //console.log('Token: ', token);
        chai.request(server)
            .get('/api/v1/questions/' + questionId)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('content');
              res.body.data.should.have.property('title');
              res.body.data.should.have.property('question_id');
              res.body.data.should.have.property('user_id');
              res.body.data.should.have.property('email');
              res.body.data.should.have.property('created_on');
              res.body.data.should.have.property('display_name');
              res.body.should.have.property('message');
              done();
            })
      })
    })

    describe('POST an answer to Question /POST', () => {
      it('Should be able to post an answer to a question with questionId', (done) => {
        chai.request(server)
            .post('/api/v1/questions/' + questionId.toString() + '/answers')
            .set('x-access-token', token)
            .send(postAnswerFields)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.data.should.be.a('object');
              res.body.data.should.have.property('content');
              res.body.data.should.have.property('question_id');
              res.body.data.should.have.property('user_id');
              res.body.data.should.have.property('created_on');
              res.body.data.should.have.property('answer_id');
              answerId = Number(res.body.data.answer_id);
              res.body.should.have.property('message');
              done();
            })
      })
    })

    describe('GET answers to Question /GET', () => {
      it('Should be able to post an answer to a question with questionId', (done) => {
        chai.request(server)
            .get('/api/v1/questions/' + questionId.toString() + '/answers')
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.data.should.be.a('array');
              res.body.should.have.property('limit');
              res.body.should.have.property('page');
              res.body.should.have.property('page');
              res.body.should.have.property('message');
              done();
            })
      })
    })

    describe('PUT Set answer as preferred to Question /PUT', () => {
      it('Should be able to post an answer to a question with questionId', (done) => {
        chai.request(server)
            .put('/api/v1/questions/' + questionId.toString() + '/answers/' + answerId.toString())
            .set('x-access-token', token)
            .send({
              '_method' : 'put'
            })
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.should.have.property('message');
              done();
            })
      })
    })

  }) 

  