const mongoose = require('mongoose')
//const { ObjectId } = require('mongodb')
//const { v1: uuidv1 } = require('uuid');

const roomSchema = new mongoose.Schema(
    {
        
    room: {
            type: String,
            requied: true,
            trim: true
        },
    
    room_id: {
        type: String,
        required: true,
            }

    })

const Room = mongoose.model('Room',roomSchema)
module.exports = Room