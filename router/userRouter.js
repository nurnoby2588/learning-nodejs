const express = require('express');
const { handleSignUP, handleLogin } = require('../controller/userController');
const userRouter = express.Router();

userRouter.post('/signup', handleSignUP);
userRouter.post('/login', handleLogin);

module.exports = userRouter;