const jwt = require('jsonwebtoken');
// const { JWT_USER_PASSWORD } = require("../config");

function verifyToken(key) {
    return (req, res, next) => {

        const token = req.headers.authorization;
        const decoded = jwt.verify(token, key);

        if (decoded) {
            req.userId = decoded.userId;
            next();
        } else {
            res.status(403).json({
                message: "you are not signed in"
            })
        }
    }
}

module.exports = {
    verifyToken: verifyToken
}







// function userMiddleware(req, res, next) {
//     const token = req.headers.authorization;
//     const decoded = jwt.verify(token, JWT_USER_PASSWORD);

//     if (decoded) {
//         req.userId = decoded.userId;
//         next();
//     } else {
//         res.status(403).json({
//             message: "you are not signed in"
//         })
//     }
// }