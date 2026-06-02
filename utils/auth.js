const jwt = require("jsonwebtoken");
const secretCode = process.env.JWTSECRET;
const expiry = "1h";

const generateToken = ({username, email, _id})=>{
    const payLoad={ username, email, userId: _id};
    return jwt.sign(payLoad, secretCode, {expiresIn:expiry} )
}

module.exports = {generateToken, expiry};