const mongoose = require('mongoose')
const bcrypt = require("bcryptjs")
const crypto = require('crypto')
//const { ObjectId } = require('mongodb')
//const { ObjectId } = require('mongodb')
//const { v1: uuidv1 } = require('uuid');

const userSchema = new mongoose.Schema(
    {
        name: {
            type:String,
            required: true,
            trim:true
        },

        room_id: {
            type: String,
            required: true,
            },
        
        isHost : {
            type:Boolean,
            default: false
        }
    })


// userSchema.pre("save", function (next) {
//     const user = this;
    
//     if (user.isModified("room_id")) {
        
//         user.room_id = crypto.randomBytes(20).toString('hex')
//     }
//     next();
// });


const User = mongoose.model('User',userSchema)
module.exports = User