const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String,
    },
    venue: {
        type: String,
        //required: true
    },
    dateTime: {//mongodb storesthe ISO format dateTime
        type: Date,
        required: true
    },
    organizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timeStamps: true });

//middleware function gets called before the actual db operation happens
//runs before deleting by ID
eventSchema.pre("findOneAndDelete",async function(){
    const registration = require("./Registration");
    const eventId = this.getQuery()._id;;
    await registration.deleteMany({eventId})
} );

module.exports = mongoose.model("Event", eventSchema);