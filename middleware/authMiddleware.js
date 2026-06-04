const jwt = require("jsonwebtoken");
const secretCode = process.env.JWTSECRET;
const {expiry} = require("../utils/auth");

//middleware function can be used before every route need authentication for each route
//if token is valid move to next route, else retun the error message
const authMiddleware = async (req, res, next) =>{
    let token = req.body?.token || req.query?.token || req.headers.authorization;
    if(req.headers.authorization){
        token = token.split(' ').pop().trim();
    }
    if(!token) return res.status(404).json({message:"you must logged in to do that."})
    try{
        const data = jwt.verify(token, secretCode, {maxAge:expiry});
        req.user = data;
        console.log(data);
     }catch(error){
        console.error(error);
        return res.status(401).json({error:"Invalid token."});
    }
    next();
}

module.exports = authMiddleware;