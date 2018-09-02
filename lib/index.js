import app from '../server';


/**
 * Node App starter
 */

const port = process.env.port || 8050;
app.listen(port, () => {
  console.log('Node Server Started', `Listening at Port: ${port}`);
});
