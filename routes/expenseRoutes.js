const express = require('express')
const { protect } = require('../controllers/authcontroller')
const { createExpense, editExpense, deleteExpense, getUsersExpense, getTopCategory, getPaymentMethodStats, getCategoryStats, getMonthlyStats } = require('../controllers/expenseController')
const { getMyExpense } = require('../controllers/userController')

const router = express.Router()

router.post('/create', protect, createExpense)
router.post('/edit/:id', protect, editExpense)
router.delete('/delete/:id',protect,deleteExpense)
router.get('/expense/:id',protect,getUsersExpense)
router.get('/category-stats',protect,getCategoryStats)
router.get('/payment-stats',protect,getPaymentMethodStats)
router.get('/top-category',protect,getTopCategory)
router.get('/monthly-stats',protect,getMonthlyStats)
module.exports = router