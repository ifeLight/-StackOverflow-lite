import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Database Connection String
 * Example : postgresql://username:password@server:port/databaseName
 */
const connectionString = process.env.DATABASE_URL || 'postgres://mdhiagiz:LwMBraBjyZWw87qf2YI1KVIj1bsqRQK6@pellefant.db.elephantsql.com:5432/mdhiagiz';

const pool = new Pool({
  connectionString,
});

/**
 * Stop application an error occurs on the Database
 */
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err.stack);
  pool.end();
  process.exit(-1);
});

/**
 * When the Database is connected
 */
pool.on('connect', () => {
  console.log('PostgreSQL Database Connected');
});
/**
 * Before Application Closes, database has to shut down
 */
process.on('SIGINT', () => {
  console.log(' Closing PostgreSQL Database ....');
  pool.end()
    .then(() => { console.log('Database Succesfully Closed'); })
    .catch((err) => { console.log(err.stack); });
});


export default pool;
