import db from '../../../config/db';

/**
 *
 * @param {email, password, displayName}
 * returns a Promise
 * (ON CONSTRUCTION)
 */

const registerUser = async function registerUserInDatabase() {
  const client = await db.connect();
  try {
    await client.query('SELECT * FROM users WHERE id = $1', [1]);
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};

export default registerUser;
