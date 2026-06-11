//import dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const db = require("./config/db");
const routes= require("./routes");
const passport = require("passport");
require('./config/passport');//runs the strategy

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin:process.env.FRONTEND_URL
}));
//routes
app.use(passport.initialize());
app.use("/api",routes);

//start the express server
app.listen(PORT,()=>{
    console.log(`Event Management Application started and listening on ${PORT}.`);
});