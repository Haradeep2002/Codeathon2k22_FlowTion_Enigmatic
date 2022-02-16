
const User = require('../models/user')
const signup = async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}

const signin = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)

        const token = await user.generateAuthToken()
        res.status(200).send({ user, token })
    } catch (e) {
        return res.status(401).json({
            error: e
        })
    }
}

const signout = async (req, res) => {
    try {
        req.user.token = null
        await req.user.save()

        res.send("signed out")
    } catch (e) {
        res.status(500).json({ e })
    }
}

const userById = async (req, res, next, id) => {
    try {
        console.log("userByid")
        const user = await User.findById(id)
        if (!user) {
            throw new Error("user not found")
        }
        req.profile = user
        next()
    } catch (e) {
        return res.status(400).json({
            error: e
        })
    }
}
const read = (req, res) => {
    res.json(req.profile)
}

module.exports = {
    signup, signin, signout, userById, read
}