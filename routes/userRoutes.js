const express = require('express')
const { protect } = require('../controllers/authcontroller')
const { editUser, getProfile, getMyExpense } = require('../controllers/userController')
const router = express.Router()


router.post('/edit-profile', protect, editUser)
router.get('/my-profile', protect, getProfile)
router.get('/my-expenses',protect, getMyExpense)

module.exports = router