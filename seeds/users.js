import db from '../config/db';

/**
 * Creation of Users Table
 */

const createUsersTable = async () => {
  const client = await db.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL UNIQUE,
            display_name VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            created_on TIMESTAMPTZ DEFAULT NOW (),
            PRIMARY KEY (user_id, email)
        );`;
    await client.query(query);
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};

export default createUsersTable;
