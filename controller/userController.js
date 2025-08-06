const handleCatchError = require('../Error/handleCatchError');
const User = require('../model/userSchema');
const { v4: uuidv4 } = require('uuid');
const { setUser } = require('../services/auth');


const handleSignUP = async (req, res) => {
    const { name, email, password } = req.body;
    try {

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        return res.redirect('/')
    } catch (error) {
        handleCatchError(error, res);
    }
}
const handleLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const sectionId = uuidv4();

        const user = await User.findOne({ email, password })

        if (!user) {
            return res.render('login', {
                error: 'Invalid email or password'
            });
        }
        setUser(sectionId, user);
        res.cookie("uid", sectionId)
        return res.redirect('/')
    } catch (error) {
        handleCatchError(error, res);
    }
}

module.exports = {
    handleSignUP, handleLogin
}