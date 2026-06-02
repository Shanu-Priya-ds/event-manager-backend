const registrationRoutes = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const {addRegistration, getRegistrationById, getRegistrationByEventId, deleteRegistration} = require("../controllers/registrationController");
const isEventOrganizer = require("../middleware/eventMiddlware");
//middleware to check the validity of token before routes get executed
registrationRoutes.use(authMiddleware);

//routes
registrationRoutes.get("/:id",(req, res)=>{
   getRegistrationById(req, res);
});
//protected route only for orgnaizer
registrationRoutes.get("/event/:eventId", isEventOrganizer,(req, res)=>{
   getRegistrationByEventId(req, res);
});

registrationRoutes.post("/:eventId", (req, res)=>{
    addRegistration(req, res);
});

registrationRoutes.delete("/:eventId", (req, res)=>{
    deleteRegistration(req, res);
});

module.exports = registrationRoutes;
