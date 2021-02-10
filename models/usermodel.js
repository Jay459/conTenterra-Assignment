const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const validator = require('validator')

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate:[validator.isEmail,'please enter a valid email']
    },
    password:{
        type: String,
        required:true,
        minlength:8,
        select:false
    },
    role:{
        type: String,
        default: 'employee'
    },
    createdAt:{
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

//hashing password
userSchema.pre('save', async function(next) {
    if(!this.isModified){
        next();
    }
    this.password = await bcrypt.hash(this.password ,10);
})

//comparing the password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

//generating the JsonWebTokem
userSchema.methods.getJwtToken = function () {
    return jwt.sign({_id: this._id},process.env.JWT_SECRET)
}

const User = mongoose.model('User',userSchema);
module.exports = User;