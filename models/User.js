const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRound = 8;

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },

    password: {
        type: String,
        required: function(){
            return !this.googleId;
        },//if oAuth, password is not required
        minLength: 5
    },

    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    googleId: { 
        type: String,
        sparse: true,//unique index applies only for the documents who have the googleId, do it wont conflict with user created using usernam/password
        unique: true
     }, // for Google auth users
},{ timestamps: true });

userSchema.pre("save", async function () {
    console.log(this.password)
    if (this.password && (this.isNew || this.isModified("password"))) {
        //hash password
        this.password = await bcrypt.hash(this.password, saltRound);
    }
});

userSchema.methods.isCorrectPassword = async function (password) {
    if(this.password)
        return await bcrypt.compare(password, this.password);
    else
        return true;
    
}


module.exports = mongoose.model("User", userSchema);