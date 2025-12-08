const express = require('express')
const { protect } = require('../controllers/authcontroller')
const { createExpense, editExpense, deleteExpense, getUsersExpense, getTopCategory, getPaymentMethodStats, getCategoryStats, getMonthlyStats } = require('../controllers/expenseController')
const { getMyExpense } = require('../controllers/userController')

const router = express.Router()

router.post('/create', protect, createExpense)
router.post('/edit/:id', protect, editExpense)
router.delete('/delete/:id',protect,deleteExpense)
router.get('/expense/:id',protect,getUsersExpense)
router.get('/expense/category',protect,getCategoryStats)
router.get('/expense/payment-stats',protect,getPaymentMethodStats)
router.get('/expense/top-category',protect,getTopCategory)
router.get('/expense/monthly-stats',protect,getMonthlyStats)
module.exports = router