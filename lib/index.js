import app from '../server';


/**
 * Node App starter
 */

const port = process.env.PORT || 8050;
app.listen(port, () => {
  console.log('Node Server Started', `Listening at Port: ${port}`);
});
