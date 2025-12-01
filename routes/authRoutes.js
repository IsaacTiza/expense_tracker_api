const express = require('express');
const router = express.Router();
const { registerUser, loginUser, protect } = require('../controllers/authcontroller');

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, (req, res) => {
    const user = req.user
    res.status(200).json({
       user
    })
})  

module.exports = router