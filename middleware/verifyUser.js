const { getUser } = require("../services/auth");

const verifyUser = (req, res, next) => {
    const userId = req.cookies?.uid;

    if (!userId) {
       return res.redirect('/login');
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    const user = getUser(userId);
    if (!user) {
        req.user = undefined; // Set req.user to undefined
        return res.redirect('/login'); // Redirects to login page
    }   
    req.user = user;
    next();
}

const checkAuth = (req, res, next) => {
    const userId = req.cookies?.uid;
     const user = getUser(userId);
      req.user = user;
    next();
}
module.exports = {verifyUser, checkAuth};