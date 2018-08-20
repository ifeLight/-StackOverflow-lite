import express from 'express';
import { Pool } from 'pg';

const connectionString = 'postgresql://stack:stack@localhost:5432/stack'

const con = new Pool({
  connectionString: connectionString,
})

con.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  con.end()
})

const app = express();

app.get("/", (req, res) => {
    res.send("Page Started")
})

app.listen(8050, () => {
    console.log("Node Server Started", "Listening at Port: 8050");
})