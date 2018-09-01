import jwt from 'jsonwebtoken';
import config from '../../../config/default';

/* eslint-disable-next-line */
const isAuthenticated = function authenticationCheck(req, res, next) {
  const token = req.headers['x-access-token'];
  // console.log("tok :", token);
  if (!token) {
    return res.status(401).send({
      auth: false,
      token: null,
      message: 'No token provided.',
    });
  }


  const decoded = jwt.verify(token, config.tokenSecret);

  if (decoded) {
    // console.log(decoded);
    req.app.set('userId', decoded.id); // controllers depend on this
    next();
  } else {
    return res.status(401).json({
      auth: false,
      token: null,
      message: 'Failed to authenticate token.',
    });
  }
};

export default isAuthenticated;
