import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';

import './seeds';

import api from './api';

const app = express();

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Using logger to log requests to the console
app.use(logger('dev'));


app.get('/', (req, res) => {
  res.send('Page working yes');
});


/**
 * Api Routers
 */
app.use('/api', api);

/**
 * 404 page
 */
app.use((req, res) => {
  res.status(404).send('Page not found');
});

export default app;
