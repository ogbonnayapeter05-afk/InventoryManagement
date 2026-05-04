const jwt = require ('jsonwebtoken')

exports.protect = (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startswitch('Bearer')){
        token = req.headers.authorization.Split(" ")[1];
    }
    if (!token) {
        return res.status(401).json ({message: 'Not authorised, no token'});
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // contains id + role
        next();
    } catch (error) {
        return res.status(401).json ({message: 'token failed'})
    }
};