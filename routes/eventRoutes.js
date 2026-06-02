const eventRoutes = require("express").Router();
const {getEvents,getAllEvents, getEventById, createNewEvent, updateEvent, deleteEvent } = require("../controllers/eventController")
const authMiddleware = require("../middleware/authMiddleware");
const isEventOrganizer = require("../middleware/eventMiddlware");

//middleware to check the validity of token before routes get executed
eventRoutes.use(authMiddleware);

//ROUTES
//get loggedIn users events
eventRoutes.get("/", (req, res)=>{
    console.log("Get events router");
    getEvents(req, res);
});

eventRoutes.get("/all", (req, res)=>{
    console.log("Get All events router");
    getAllEvents(req, res);
});

eventRoutes.get("/:id", async(req, res)=>{
    getEventById(req, res);
});

//create new event
eventRoutes.post("/", async (req, res)=>{
    createNewEvent(req, res)
});

//update event- protected route only for orgnaizer
eventRoutes.put("/:id",isEventOrganizer, async(req, res)=>{
    updateEvent(req, res);
});

//delete an event - protected route only for orgnaizer
eventRoutes.delete("/:id", isEventOrganizer, async (req, res)=>{
    deleteEvent(req, res);
});

module.exports = eventRoutes;