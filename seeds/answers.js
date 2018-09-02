import db from '../config/db';

/**
 * Creation of Answers Table
 */

const createAnswersTable = async () => {
  const client = await db.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS answers (
            answer_id SERIAL UNIQUE,
            user_id SERIAL NOT NULL REFERENCES users (user_id),
            question_id SERIAL NOT NULL REFERENCES questions (question_id),
            content VARCHAR NOT NULL,
            created_on TIMESTAMPTZ DEFAULT NOW (),
            PRIMARY KEY (answer_id)
        );`;
    await client.query(query);
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};

export default createAnswersTable;
