import db from '../config/db';

/**
 * Creation of Comments Table
 */

const createCommentsTable = async () => {
  const client = await db.connect();
  try {
    const query = `CREATE TABLE IF NOT EXISTS comments (
            comment_id SERIAL,
            answer_id SERIAL NOT NULL REFERENCES answers (answer_id),
            content VARCHAR NOT NULL,
            created_on TIMESTAMPTZ DEFAULT NOW (),
            PRIMARY KEY (comment_id)
        );`;
    await client.query(query);
  } catch (e) {
    throw e;
  } finally {
    client.release();
  }
};

export default createCommentsTable;
