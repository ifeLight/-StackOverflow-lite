import { Pool } from 'pg';

/**
 * Database Connection String
 * Example : postgresql://username:password@server:port/databaseName
 */
const connectionString = 'postgresql://stack:stack@localhost:5432/stack'

const pool = new Pool({
  connectionString
})

/**
 * Stop application an error occurs on the Database
 */
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err)
  process.exit(-1)
})

/**
 * Before Application Closes, database has to shut down
 */
process.on("SIGINT", function closingDatabase() {
  console.log(" Closing PostgreSQL Database ....");
  pool.end()
  .then(() => { console.log("Database Succesfully Closed");})
  .catch((err) => { console.log(err);})
})


export default pool;
