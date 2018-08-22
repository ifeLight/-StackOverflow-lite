import db from '../config/db';

/**
 * Creation of Users Table
 */

(async () => {
    const client = await db.connect()
    try {
        let query = `CREATE TABLE IF NOT EXISTS users (
            user_id SERIAL,
            display_name VARCHAR NOT NULL,
            email VARCHAR NOT NULL,
            password VARCHAR NOT NULL,
            created_on TIMESTAMPTZ DEFAULT NOW (),
            PRIMARY KEY (user_id, email)
        );`;
        await client.query(query)
    } finally {
        client.release()
    }
})().catch(e => console.log(e.stack))