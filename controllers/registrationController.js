const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");


const addRegistration = async (req, res)=>{
    try{
        console.log(`eventId: ${req.params.eventId}`);
        console.log(`user Id: ${req.user.userId}`);

        const postData = {eventId:req.params.eventId, userId: req.user.userId};
        const data = await Registration.find(postData);
        if(data.length > 0) return res.status(409).json({error: "User already registered for the event"});

        const registration = await Registration.create(postData);
        res.status(201).json(registration);
    }catch(error){
        res.status(400).json({
            error: `User registration failed. ${error.message}`
        });
        console.error(error);
    }
}

const getRegistrationById = async (req, res)=>{
    try{
        const data = await Registration.findById(req.params.id);
        if(data==null) return res.status(404).json({error: `Registration with id ${req.params.id} doesn't exist`});
        res.json(data);
    }catch(error){
        res.status(400).json({error: error.message});
        console.error(error);
    }
}


const getRegistrationByEventId = async (req, res)=>{
    try{
        const data = await Registration.find({eventId:req.params.eventId});
        res.json(data);
    }catch(error){
        res.status(400).json({error: error.message});
        console.error(error);
    }
}
const deleteRegistration = async (req, res)=>{
    try{
        const data = await Registration.findByIdAndDelete(req.params.eventId);
        if(!data) return res.status(404).json({error: "Registration not found"});
        res.status(204).send();
    }catch(error){
        res.status(400).json({error: error.message});
        console.error(error);
    }
}


module.exports = {addRegistration, getRegistrationById, getRegistrationByEventId, deleteRegistration};