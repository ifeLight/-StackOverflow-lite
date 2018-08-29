import db from '../config/db';

/**
 * Creation of Votes Table
 */

const createVotesTable = async () => {
    const client = await db.connect()
    try {
        let query = `CREATE TABLE IF NOT EXISTS votes (
            vote_id SERIAL,
            user_id SERIAL NOT NULL REFERENCES users (user_id),
            answer_id SERIAL NOT NULL REFERENCES answers (answer_id),
            vote BOOLEAN NOT NULL,
            created_on TIMESTAMPTZ DEFAULT NOW (),
            PRIMARY KEY (vote_id)
        );`;
        await client.query(query)
    } finally {
        client.release()
    }
}

export default createVotesTable;