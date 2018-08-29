import db from '../config/db';

/**
 * Creation of Comments Table
 */

const createCommentsTable = async () => {
    const client = await db.connect()
    try {
        let query = `CREATE TABLE IF NOT EXISTS answers (
            comment_id SERIAL,
            answer_id SERIAL NOT NULL REFERENCES answers (answer_id),
            content VARCHAR NOT NULL,
            created_on TIMESTAMPTZ DEFAULT NOW (),
            PRIMARY KEY (comment_id)
        );`;
        await client.query(query)
    } finally {
        client.release()
    }
}

export default createCommentsTable;