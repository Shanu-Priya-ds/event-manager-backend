const User = require("../models/User");
const Event = require("../models/Event");
const Registration = require("../models/Registration");


const addRegistration = async (req, res)=>{
    try{
        console.log(`eventId: ${req.params.eventId}`);
        console.log(`user Id: ${req.user.userId}`);
        
        const postData = {eventId:req.params.eventId, userId: req.user.userId}; 
        //validate if the user is registerd for the same event
        const data = await Registration.find(postData);
        if(data) return res.status(409).json({message: "User already registerd for the event"});
        
        const registration = await Registration.create(postData);
        res.json({data : registration});
    }catch(error){
        res.status(404).json({
            error:`User Registration failed. ${error.message}`
        });
        console.error(error);
    }
}

const getRegistrationById = async (req, res)=>{
    try{   
        const data = await Registration.findById(req.params.id);
        if(data==null) return res.status(404).json({message:`Registration with id ${req.params.id} doesn't exists`});
        res.json(data);
    }catch(error){
        console.error(error);
    }
}


const getRegistrationByEventId = async (req, res)=>{
    try{   
        const data = await Registration.find({eventId:req.params.eventId});
        res.json(data);
    }catch(error){
        console.error(error);
    }
}
const deleteRegistration = async (req, res)=>{
    try{
        const data = await Registration.findByIdAndDelete(req.params.eventId);
        res.json({message:"registration is deleted successfully."})
    }catch(error){
        console.error(error);
    }
}


module.exports = {addRegistration, getRegistrationById, getRegistrationByEventId, deleteRegistration};