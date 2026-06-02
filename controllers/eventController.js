//const router = require("express").Router();
const Event = require("../models/Event");

//fetch all the events from db for the logged in user
const  getEvents = async (req,res)=>{
    try{
        const events = await Event.find({organizerId:req.user.userId});
        res.json(events);
    }catch(error){
        console.error(error);
    }
}

const getEventById = async (req, res)=>{
    try{
        const event = await Event.findById(req.params.id);
        res.json(event);
    }catch(error){
        console.error(error);
    }
}

const createNewEvent = async (req, res)=>{
    try{
        const createdEvent = await Event.create(req.body);
        res.status(201).json(createdEvent);
    }catch(error){
        console.error(error);
    }
}

const updateEvent = async (req, res)=>{
  try{
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, {new:true});//new:true returns the updated document
        res.json({message: "Event updated Successfully",
            updatedEvent:updatedEvent
        });
    }catch(error){
        console.error(error);
    }
}

const deleteEvent = async(req, res)=>{
  try{
        const deletedObject = await Event.findByIdAndDelete(req.params.id);
         res.json({message: "Event deleted Successfully"});
     }catch(error){
        console.error(error);
    }
}

module.exports = {getEvents, getEventById, createNewEvent, updateEvent, deleteEvent}