const express = require('express');
const router = express.Router();
const path = require('path');

//get the homepage
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

router.get('/users/login',function(req,res){
    res.sendFile(path.join(__dirname, "../public/login.html"))
})

router.get('/posts',function(req,res){
    
    res.sendFile(path.join(__dirname, "../public/feed.html"))
})

router.get('/z',function(req,res){
    res.sendFile(path.join(__dirname, "../public/zpart.html"))
})

router.get('/users',function(req,res){
    res.sendFile(path.join(__dirname, "../public/signup.html"))
})




//get the homepage
router.get('/users/login',function(req,res){
    res.sendFile(path.join(__dirname, "../login.html"))
})

//get the homepage
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname, "../index.html"))
})



//post to homepage
router.post('/',function(req,res){
    res.send()
});

//export
module.exports = router;

