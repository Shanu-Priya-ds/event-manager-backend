//const router = require("express").Router();
const Event = require("../models/Event");
const Registration = require("../models/Registration");

//fetch all the events from db for the logged in user
const getEvents = async (req, res) => {
    try {
        const events = await Event.find({ organizerId: req.user.userId });
        res.json(events);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}


const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find({});
        res.json(events);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

const getEventById = async (req, res) => {
    try {
        const event = await Event.findById(req.params.id).populate("organizerId", 'username email');
        console.log(event);
        if (!event) return res.status(404).json({ error: 'Event not found' });

        // If user is organizer, get attendee details
        let attendees = [];
        if (event.organizerId._id.toString() === req.user.userId) {
            const registrations = await Registration.find({ eventId:req.params.id }).populate('userId');
            if(registrations!=null) attendees = registrations.map(reg => reg.userId);
        }
         // Count registrations
        const attendeeCount = attendees.length;

        res.json({
            ...event.toObject(),
            attendeeCount,
            attendees,
            organizerId: event.organizerId._id.toString(),
            organizerName: event.organizerId.username
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

const createNewEvent = async (req, res) => {
    try {
        req.body.organizerId = req.user.userId;
        const createdEvent = await Event.create(req.body);
        res.status(201).json(createdEvent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

const updateEvent = async (req, res) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedEvent) return res.status(404).json({ error: "Event not found" });
        res.json(updatedEvent);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

const deleteEvent = async (req, res) => {
    try {
        const deletedObject = await Event.findByIdAndDelete(req.params.id);
        if (!deletedObject) return res.status(404).json({ error: "Event not found" });
        res.status(200).json(deletedObject);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            error: "Internal server error"
        });
    }
}

module.exports = { getEvents, getAllEvents, getEventById, createNewEvent, updateEvent, deleteEvent }