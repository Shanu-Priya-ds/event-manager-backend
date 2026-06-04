const router = require("express").Router();

const authRoutes = require("./authRoutes");
const eventRoutes = require("./eventRoutes");
const registrationRoutes = require("./registrationRoutes");

router.use("/events",eventRoutes);
router.use("/auth", authRoutes);
router.use("/registrations", registrationRoutes);

module.exports = router;