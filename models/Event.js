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
        required: true
    },
    dateTime: {
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
eventSchema.pre("findByIdAndSave",async function(){
    const registration = require("./Registration");
    await registration.deleteMany({eventId:this.ObjectId})
} );

module.exports = mongoose.model("Event", eventSchema);