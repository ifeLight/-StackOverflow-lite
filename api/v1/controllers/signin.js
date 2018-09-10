import bcrypt from 'bcrypt-nodejs';
import jwt from 'jsonwebtoken';
import db from '../../../config/db';
import config from '../../../config/default';

const signin = function signinController(req, res) {
  const { email, password } = req.body;
  (async () => {
    try {
      if (!email || !password) {
        res.status(400).json({
          auth: false,
          token: null,
          message: 'Field(s) can not be empty',
        });
      } else {
        const user = await db.query('SELECT * FROM users WHERE email = $1', [email]);
        if (user.rows.length < 1) {
          res.status(401).json({
            auth: false,
            token: null,
            message: 'Email does not exist',
          });
        } else if (!bcrypt.compareSync(password, user.rows[0].password)) {
          res.status(401).json({
            auth: false,
            token: null,
            message: 'Password is not correct',
          });
        } else {
          const userId = user.rows[0].user_id;
          const token = jwt.sign({ id: userId }, config.tokenSecret, { expiresIn: 86400 });
          res.status(200).json({
            auth: true,
            message: 'Login successfully',
            token,
          });
        }
      }
    } catch (e) {
      throw e;
    }
  })()
    .catch((err) => {
      console.error(err);
      res.status(500).json({
        auth: false,
        token: null,
        messsage: 'The Server encountered a problem',
      });
    });
};

export default signin;
