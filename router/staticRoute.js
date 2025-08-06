const express = require('express');
const Url = require('../model/urlSchema');
const staticRouter = express.Router();

staticRouter.get('/', async (req, res) => {
    if (!req.user) return res.redirect('/login');
    const allUrls = await Url.find({ createBy: req.user.id }).populate('createBy', 'name email');
    return res.render('home', {
        urls: allUrls,
        user: req.user.name

    })
})

staticRouter.get('/signup', async (req, res) => {
    return res.render('signup');
})
staticRouter.get('/login', async (req, res) => {
    return res.render('login');
})

module.exports = staticRouter