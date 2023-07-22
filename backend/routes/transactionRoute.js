const router = require('express').Router();
const { deleteExpense, getAllExpenses, addExpense } = require('../controllers/expenseController');
const { addIncome, getAllIncomes, deleteIncome } = require('../controllers/incomeController')

router  .post('/add-income', addIncome)
        .get('/get-all-incomes',getAllIncomes)
        .delete('/delete-income/:transactId',deleteIncome)
        .post('/add-expense', addExpense)
        .get('/get-all-expenses',getAllExpenses)
        .delete('/delete-expense/:transactId',deleteExpense)



module.exports= router