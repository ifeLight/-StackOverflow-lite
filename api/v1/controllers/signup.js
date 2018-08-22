import db from "../../../config/db";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import config from "../../../config/default";

const signup = function signupController(req, res) {
    const {email, password, displayName} = req.body;

    if (!email || !password || !displayName) {
        // Validation
        res.status(400).json({
            auth: false,
            token: null
        })
    } else {
        (async () => {
            const client = await db.connect()
            try {
                const genSalt = bcrypt.genSaltSync(8);
                const hashedPassword = bcrypt.hashSync(password, genSalt);
                
                let query = `INSERT INTO users (email, password, display_name) VALUES ($1, $2, $3) RETURNING user_id`;
                const resp = await client.query(query, [email, hashedPassword, displayName]);
                console.log(resp.rows[0]);
                const token = jwt.sign({id : resp.rows[0].user_id}, config.tokenSecret, {expiresIn: 86400});

                res.status(200).json({
                    auth : true,
                    token
                })
            } catch (err) {
                throw err;
            } finally {
                client.release()
            }
        })()
        .catch((e) => {
                console.error(e);
                res.status(500).json({
                    auth: false,
                    token: null,
                    error: "The Server encountered a problem"
                });
            })
    }

}

export default signup;