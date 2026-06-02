const registrationRoutes = require("express").Router();

registrationRoutes.get("/",(req, res)=>{
    res.send("get all the events");
})

module.exports = registrationRoutes;
