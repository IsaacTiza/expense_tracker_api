const express = require('express')
const { protect } = require('../controllers/authcontroller')
const { editUser } = require('../controllers/userController')
const router = express.Router()


router.post('/edit_profile', protect, editUser)

module.exports = router