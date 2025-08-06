const jwt = require('jsonwebtoken');

const setUser = (user) => {
    const payload = {
        id: user._id,
        name: user.name,
        email: user.email
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' },)

    return token
}
const getUser = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        return null;
    }
}
module.exports = {
    setUser,
    getUser
}