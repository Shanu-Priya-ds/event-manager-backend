const registrationRoutes = require("express").Router();
const authMiddleware = require("../middleware/authMiddleware");
const {addRegistration, getRegistrationById, getRegistrationByEventId, deleteRegistration} = require("../controllers/registrationController");

registrationRoutes.use(authMiddleware);

registrationRoutes.get("/:id",(req, res)=>{
   getRegistrationById(req, res);
});
registrationRoutes.get("/event/:eventId",(req, res)=>{
   getRegistrationByEventId(req, res);
});

registrationRoutes.post("/:eventId", (req, res)=>{
    addRegistration(req, res);
});

registrationRoutes.delete("/:eventId", (req, res)=>{
    deleteRegistration(req, res);
});

module.exports = registrationRoutes;
