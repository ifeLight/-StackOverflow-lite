import db from "../../../config/db";
import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import config from "../../../config/default";

const signin = function signinController(req, res) {
    const { email, password } = req.body;
    (async () => {
            const client = await db.connect();
            try {
                if (!email || !password) {
                    res.status(400).json({
                        auth: false,
                        token: null,
                        error : "Field(s) can not be empty"
                    })
                } else {
                    const user = await client.query("SELECT * FROM users WHERE email = $1", [email])
                    if (user.rows.length < 1) {
                        res.status(401).json({
                            auth: false,
                            token: null,
                            error : "Email does not exist"
                        })
                    } else {
                        if (!bcrypt.compareSync(password, user.rows[0].password)) {
                            res.status(401).json({
                                auth: false,
                                token: null,
                                error : "Password is not correct"
                            })
                        } else {
                            const token = jwt.sign({id : user.rows[0].id}, config.tokenSecret, {expiresIn: 86400});
                            res.status(200).json({
                                auth : true,
                                token
                            })
                        }
                    }
                }
            } catch (e) {

            } finally {
                client.release()
            }
        })()
        .catch((err) => {
            console.error(err)
            res.status(500).json({
                auth: false,
                token: null,
                error: "The Server encountered a problem"
            });
        })
}

export default signin;