const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const Room = require('../models/room')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')

//Host creates a new room
router.post('/newRoom', async(req,res) => {
    
    const user = new User({name:req.body.name,room_id:crypto.randomBytes(20).toString('hex'),isHost:true})
    const room = new Room({room:req.body.room,room_id: user.room_id})
    console.log(room,user)
    try{
        await room.save()
        await user.save()
        res.status(200).send({room,user})
        
    } catch(e){
        res.status(400).send(e)
    }
})

router.post('/joinRoom/:id', async(req,res) => {
    const id = req.params.id
    const room = await Room.findOne({room_id:id})
    if (!room) return res.status(401).json({ message: "The room does not exists" });
    const user = new User({name:req.body.name,room_id:id,isHost:false})
    try{
        await user.save()
        const payload = {
            user: {
              id:user._id,
              room_id:id
            }
          };

          jwt.sign(
            payload,
            "secretjwt",
            {
              expiresIn: 36000,
            },
            (err, token) => {
              if (err) throw err;
              console.log("logged in");
              res.json({ token, user });
            }
          );
        //res.status(200).send({user,message:'You have joined the room'})
    } catch(e){
        res.status(400).send(e)
    }
})


module.exports = router