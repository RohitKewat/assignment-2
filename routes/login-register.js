
const express = require('express')
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const userModel = require('../models/user')
const jwt = require('jsonwebtoken');

const router = express.Router();

router.use(bodyParser.json());

router.post('/register',async(req,res)=>{
    

    try{
        const {name,email,password} = req.body

        const emailvali = await userModel.findOne({email});

        console.log(emailvali);
        if(emailvali){

            return res.status(400).json({
                status:"failed",
                message : "user is already present no need to register"
            })
        }
        
        const data = await userModel.create(req.body);
         res.status(201).json({
            status : "success",
            data : data
        })

    }catch(e){
        res.status(400).json({
            status : "failed in catch",
            message : e.message
        })
    }


})

router.post('/login',async(req,res)=>{

    try {
        const {email,password} = req.body
        const isemailPresent = await userModel.findOne({email})
        const ispasswordPresent = await userModel.findOne({password})
        if(isemailPresent && ispasswordPresent){

            const token = await jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: isemailPresent._id
              }, 'secret');

            res.status(200).json({ 
               status : "success",
               token : token
            })
        }else{
            res.status(400).json({
                status : "failed",
                message : "please enter valid email or password"
            })
        }

        
    } catch (e) {
        
    }
})




module.exports = router