const mongoose = require("mongoose");

const registrationSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required: true
    },
    eventId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event',
        required: true
    }

},{timeStamps:true})


module.exports = mongoose.model("Registration", registrationSchema);