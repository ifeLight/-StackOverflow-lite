import db from '../config/db';

/**
 * Creation of Answers Table
 */

const createAnswersTable = async () => {
    const client = await db.connect();
    try {
        let query = `CREATE TABLE IF NOT EXISTS answers (
            answer_id SERIAL,
            user_id SERIAL NOT NULL REFERENCES users (user_id),
            question_id SERIAL NOT NULL REFERENCES questions (question_id),
            content VARCHAR NOT NULL,
            created_on TIMESTAMPTZ DEFAULT NOW (),
            PRIMARY KEY (answer_id)
        );`;
        await client.query(query);
    } finally {
        client.release();
    }
}

export default createAnswersTable;