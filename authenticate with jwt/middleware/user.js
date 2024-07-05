const { User } = require("../db");
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config/jwt');
function userMiddleware(req, res, next) {
    const token = req.headers.authorization;
    const word = token.split(" ");
    console.log(word);
    const jwtToken = word[1];
    const verified = jwt.verify(jwtToken, JWT_SECRET);
    if(verified.username){
        req.username = verified.username;
        next();
    }
    else {
            res.status(403).json({
                msg: "User doesnt authorized."
            })
        }
    }

module.exports = userMiddleware;