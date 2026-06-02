const eventRoutes = require("express").Router();
const {getAllEvents} = require("../controllers/eventController")

eventRoutes.get("/", (req, res)=>{
    console.log("Get events router");
    getAllEvents(req, res);
});

module.exports = eventRoutes;