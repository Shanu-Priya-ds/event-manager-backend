const eventRoutes = require("express").Router();
const {getEvents, getEventById, createNewEvent, updateEvent, deleteEvent } = require("../controllers/eventController")

//get all events
eventRoutes.get("/", (req, res)=>{
    console.log("Get events router");
    getEvents(req, res);
});

eventRoutes.get("/:id", async(req, res)=>{
    getEventById(req, res);
});

//create new event
eventRoutes.post("/", async (req, res)=>{
    createNewEvent(req, res)
});

//update event
eventRoutes.put("/:id", async(req, res)=>{
    updateEvent(req, res);
});

//delete an event
eventRoutes.delete("/:id",async (req, res)=>{
    deleteEvent(req, res);
});


module.exports = eventRoutes;