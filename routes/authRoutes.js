const express = require('express');
const router = express.Router();
const { registerUser, loginUser, protect } = require('../controllers/authcontroller');

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect)

module.exports = router