const authRoutes = require("express").Router();
const {createUser, authenticateUser} = require("../controllers/authController");

authRoutes.post("/register",(req, res)=>{
   createUser(req, res);
  
})

authRoutes.post("/login",(req, res)=>{
   authenticateUser(req, res);
})
module.exports = authRoutes;