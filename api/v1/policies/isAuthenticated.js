import jwt from "jsonwebtoken";
import config from "../../../config/default";
const isAuthenticated = function (req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({
        auth: false,
        token : null,
        message: 'No token provided.'
    });


    const decoded = jwt.verify(token, config.tokenSecret);

    if (!decoded) {
        if (err) return res.status(500).json({
            auth: false,
            token : null,
            error: 'Failed to authenticate token.'
        });
    } else {
        //console.log(decoded);
        req.app.set("userId", decoded.id); //controllers depend on this
        next();
    }
}

export default isAuthenticated;