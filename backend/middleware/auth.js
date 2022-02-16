const jwt = require('jsonwebtoken')
const User = require('../models/user')
const auth = async (req, res, next) => {
    try {
        console.log("here")
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, token: token })
        if (!user) {
            throw new Error('no user found')
        }
        req.token = token

        req.user = user
        next()
    } catch (e) {
        console.log(e)
        res.status(401).send({ error: e })
    }
}

module.exports = auth