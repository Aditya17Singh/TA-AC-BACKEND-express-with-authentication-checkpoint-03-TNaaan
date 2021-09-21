var express = require("express");
var router = express.Router();
var Expense = require("../model/Expense");
var Income = require("../model/Income");
var User = require("../model/User");

router.use("/", async (req, res, next) => {
  var budgetdata = [];
  var expenses = await Expense.find({ userId: req.user.id });
  budgetdata = budgetdata.concat(expenses);
  var incomes = await Income.find({ userId: req.user.id });
  budgetdata = budgetdata.concat(incomes);
  res.render("dashboard", { budgetdata });
});

module.exports = router;
