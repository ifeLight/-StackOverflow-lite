import { Router } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import signupcontroller from './controllers/signup';
import loginController from './controllers/signin';
import postQuestioncontroller from './controllers/postQuestion';
import getAllQuestionsController from './controllers/getAllQuestions';
import getQuestionController from './controllers/getQuestion';
import deleteQuestionController from './controllers/deleteQuestion';
import postAnswerController from './controllers/postAnswer';
import getAnswersController from './controllers/getAnswers';
import markAnswerController from './controllers/markAnswer';
import getProfileController from './controllers/getProfile';

import isAuthenticated from './policies/isAuthenticated';

const v1app = Router();

// Use cors for cross origin request for api
v1app.use(cors());

// use body parser so we can get info from POST and/or URL parameters
v1app.use(bodyParser.urlencoded({ extended: false }));
v1app.use(bodyParser.json());

// Test
v1app.get('/', (req, res) => {
  res.status(200).send('Stackoverflow v1 app');
});


/**
 * Authentication Endpoints
 */

// Signup Endpoint
v1app.post('/auth/signup', signupcontroller);

// Login Endpoint
v1app.post('/auth/login', loginController);


/**
  * Questions CRUD endpoints
  */

// Fetch all questions Endpoint
v1app.get('/questions', getAllQuestionsController);

// Fetch a question Endpoint
v1app.get('/questions/:questionId', getQuestionController);

// Add a question Endpoint
v1app.post('/questions', [isAuthenticated, postQuestioncontroller]);

// delete a question Endpoint
v1app.delete('/questions/:questionId', [isAuthenticated, deleteQuestionController]);

// Post an answer to a question Endpoint
v1app.post('/questions/:questionId/answers', [isAuthenticated, postAnswerController]);

// Get list of answers to a question Endpoint
v1app.get('/questions/:questionId/answers', getAnswersController);

// Mark an answer to a question as Preferred Endpoint
v1app.put('/questions/:questionId/answers/:answerId', markAnswerController);

// Get user profile
v1app.get('/profile', [isAuthenticated, getProfileController]);

export default v1app;
