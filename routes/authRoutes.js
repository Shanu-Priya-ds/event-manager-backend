const authRoutes = require("express").Router();


authRoutes.get("/login",(req, res)=>{
   res.send("login restAPI");
  
})

module.exports = authRoutes;