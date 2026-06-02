const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRound = 8;

const userSchema = mongoose.Schema({
    username:{
     type:   String,
    required: true,
    trim: true
    },

    password:{
        type: String,
        required: true,
        minLength:5
    },

    email:{
        type:String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
}, 
{timestamps:true});

userSchema.pre("save",  async function(){
    if(this.isNew || this.isModified("password")){
    //hash password
    this.password = await bcrypt.hash(this.password, saltRound);
    }
});

userSchema.methods.isCorrectPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}


module.exports = mongoose.model("User", userSchema);