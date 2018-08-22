import db from "../../../config/db";

/**
 * 
 * @param {email, password, displayName} 
 * returns a Promise
 * (ON CONSTRUCTION)
 */
const registerUser = async function registerUserInDatabase({}) {
    const client = await pool.connect()
    try {
        const res = await client.query('SELECT * FROM users WHERE id = $1', [1])
    }  catch {

    }  finally {
        client.release();
    }
}

export default registerUser;