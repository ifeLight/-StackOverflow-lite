import db from "../../../config/db";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import config from "../../../config/default";

const signup = function signupController(req, res) {
    const {email, password, displayName} = req.body;

    if (!email || !password || !displayName) {
        // Validation
        res.status(400).json({
            message : 'Some required fields are empty',
            auth: false,
            token: null
        })
    } else {
        (async () => {
            const client = await db.connect()
            try {
                const genSalt = bcrypt.genSaltSync(8);
                const hashedPassword = bcrypt.hashSync(password, genSalt);

                const userExist = await client.query('SELECT * FROM users WHERE email = $1', [email]);

                if (userExist.rowCount > 0) {
                    return res.status(400).json({
                        message : 'User with this email already exist',
                        auth: false,
                        token: null
                    })
                }
                
                let query = `INSERT INTO users (email, password, display_name) VALUES ($1, $2, $3) RETURNING user_id`;
                const resp = await client.query(query, [email, hashedPassword, displayName]);
                //console.log(resp.rows[0]);
                const token = jwt.sign({id : resp.rows[0].user_id}, config.tokenSecret, {expiresIn: 86400});

                res.status(200).json({
                    message : 'Signup successfully',
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