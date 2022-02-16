const express = require('express')
const { signup, signin, signout, userById, read, update } = require('../controllers/user')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')
const router = new express.Router()

router.post('/signup', signup)
router.post('/signin', signin)
router.get('/signout', auth, signout)

router.get('/user/:userId', auth, isAuth, read)


router.param("userId", userById)

module.exports = router
