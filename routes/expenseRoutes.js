const express = require('express')
const { protect } = require('../controllers/authcontroller')
const { createExpense } = require('../controllers/expenseController')

const router = express.Router()

router.post('/create', protect, createExpense)

module.exports = router