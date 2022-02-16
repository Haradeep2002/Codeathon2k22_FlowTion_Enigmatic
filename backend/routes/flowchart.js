const express = require('express')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
const isAuth = require('../middleware/isAuth')
const { saveflow, read, readAll,readAllCat,updateFlow } = require('../controllers/flowchart')
const router = new express.Router()

router.post('/saveflow', saveflow)
router.get('/read/:id', read)
router.patch('/update/:id', updateFlow)
// router.delete('/delete/:id', auth, isAuth, isAdmin, deleteflow)

router.get('/readAll', readAll)
router.get('/readAllCat', readAllCat)

// router.param("id", flowchartbyId)

module.exports = router
