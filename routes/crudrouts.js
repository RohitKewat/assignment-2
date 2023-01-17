
const express = require('express')
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const postModel = require('../models/post');
const jwt = require('jsonwebtoken');
const e = require('express');

const router = express.Router();

router.use(bodyParser.json());

//-----------------------------------------------

router.post('/posts',async(req,res)=>{
    // console.log(req.headers.authorization);
   
    try {
        
        const post = await postModel.create(req.body)
        res.status(201).json({
            status : "success",
            createdPost : post
        })
        
    } catch (e) {
        res.status(500).json({
            status: "failed",
            message : e.message
        })
    } 


})

//------------------------------------------get ----------------------


router.get('/posts',async(req,res)=>{
    // console.log(req.headers.authorization);
   
    try {
        
        const posts = await postModel.find();
        res.status(201).json({
            status : "success",
            posts
        })
        
    } catch (e) {
        res.status(500).json({
            status: "failed",
            message : e.message
        })
    } 


})

//----------------------------------

router.put('/posts/:postId',async(req,res)=>{
 
   try{
        
       id = req.params.postId
       const updateddata = await postModel.updateOne({_id : id},req.body)
      res.status(200).json({

        message : "success",
        data : updateddata
      })
     
     
   }catch(e){

    res.status(400).json({
        status : "failed",
        message : e.message
    })
   }

})
//--------------------------------------------


router.delete('/posts/:postId',async(req,res)=>{
   
    try {
        id = req.params.postId

        const posts = await postModel.deleteOne({_id : id});
        res.status(201).json({
            status : "deleted successfully",
        
        })
        
    } catch (e) {
        res.status(500).json({
            status: "failed",
            message : e.message
        })
    } 


})


module.exports = router ;