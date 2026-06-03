//import dependencies
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT;
const db = require("./config/db");
const routes= require("./routes");

//middleware
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173"
}));
//routes
app.use("/api",routes);

//start the express server
app.listen(PORT,()=>{
    console.log(`Event Management Application started and listening on ${PORT}.`);
})
