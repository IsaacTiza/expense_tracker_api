const express = require('express')
const { protect } = require('../controllers/authcontroller')
const { createExpense, editExpense, deleteExpense } = require('../controllers/expenseController')

const router = express.Router()

router.post('/create', protect, createExpense)
router.post('/edit/:id', protect, editExpense)
router.delete('/delete/:id',protect,deleteExpense)

module.exports = router