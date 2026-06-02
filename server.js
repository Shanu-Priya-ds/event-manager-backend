//import dependencies
const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const db = require("./config/db");
const routes= require("./routes");

//middleware

//routes
app.use("/api",routes);

//start the express server
app.listen(PORT,()=>{
    console.log(`Event Management Application started and listening on ${PORT}.`);
})
