import db from '../config/db';

/**
 * Creation of Questions Table
 */

const createQuestionsTable = async () => {
  const client = await db.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS questions (
            question_id SERIAL UNIQUE,
            user_id SERIAL NOT NULL REFERENCES users (user_id),
            title VARCHAR NOT NULL,
            content VARCHAR NOT NULL,
            preferred_answer SERIAL,
            created_on TIMESTAMPTZ DEFAULT NOW (),
            PRIMARY KEY (question_id)
        );`;
    await client.query(query);
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};

export default createQuestionsTable;
