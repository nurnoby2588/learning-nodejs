const express = require('express');
const Url = require('../model/urlSchema');
const staticRouter = express.Router();

staticRouter.get('/',async(req , res)=>{
    if(!req.user) return res.redirect('/login');
    console.log(req.user)
    const allUrls = await Url.find({createBy: req.user._id}).populate('createBy', 'name email');
    console.log(allUrls)
    return res.render('home',{
        urls: allUrls,
        user:req.user.name

    })
})

staticRouter.get('/signup',async(req,res)=>{
    return res.render('signup');
})
staticRouter.get('/login',async(req,res)=>{
    return res.render('login');
})

module.exports = staticRouter