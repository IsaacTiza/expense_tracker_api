const express = require('express')
const { protect } = require('../controllers/authcontroller')
const { editUser, getProfile, getMyExpense } = require('../controllers/userController')
const router = express.Router()


router.post('/edit_profile', protect, editUser)
router.get('/my_profile', protect, getProfile)
router.get('/my_expenses',protect, getMyExpense)

module.exports = router