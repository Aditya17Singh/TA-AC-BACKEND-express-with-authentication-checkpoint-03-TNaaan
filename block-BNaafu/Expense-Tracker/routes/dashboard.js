var express = require("express");
var router = express.Router();
var Expense = require("../model/Expense");
var Income = require("../model/Income");
var User = require("../model/User");
var moment = require("moment");
var userInfo = require("../middleware/auth");

//sort by dates
router.post("/filter", async (req, res, next) => {
  var budgetdata = [];
  var expenses = await Expense.find({
    date: { $gte: req.body.initialdate, $lt: req.body.finaldate },
  });
  var incomes = await Income.find({
    date: {
      $gte: req.body.initialdate,
      $lte: req.body.finaldate,
    },
  });

  budgetdata = [...expenses, ...incomes].sort((a, b) => {
    return a.date - b.date;
  });
  res.render("dashboard", { budgetdata, incomes, expenses, moment });
});

//sort by Income
router.get("/income", async (req, res, next) => {
  var income = await Income.find({ userId: req.user.id });
  res.render("dashboard", { income });
});

router.get("/", async (req, res, next) => {
  var budgetdata = [];
  var expenses = await Expense.find({ userId: req.user.id });
  budgetdata = budgetdata.concat(expenses);
  var income = await Income.find({ userId: req.user.id });
  let sumIncomes = income.reduce((acc, cv) => {
    acc = acc + cv.amount;
    return acc;
  }, 0);
  let sumExpenses = expenses.reduce((acc, cv) => {
    acc = acc + cv.amount;
    return acc;
  }, 0);
  let savings = sumIncomes - sumExpenses;
  budgetdata = budgetdata.concat(income);
  res.render("dashboard", { budgetdata, income, expenses, moment, savings });
});

module.exports = router;
