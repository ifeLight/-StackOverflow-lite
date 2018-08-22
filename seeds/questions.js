import db from '../config/db';

/**
 * Creation of Questions Table
 */

(async () => {
    const client = await db.connect()
    try {
        let query = `CREATE TABLE IF NOT EXISTS questions (
            question_id SERIAL,
            user_id SERIAL NOT NULL REFERENCES users (user_id),
            title VARCHAR NOT NULL,
            content VARCHAR NOT NULL,
            preferred_answer SERIAL,
            created_on TIMESTAMPTZ DEFAULT NOW (),
            PRIMARY KEY (question_id)
        );`;
        await client.query(query)
    } finally {
        client.release()
    }
})().catch(e => console.log(e.stack))