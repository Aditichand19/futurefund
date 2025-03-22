const FinancialReport = require("../models/financialReportModel");
const Transaction = require("../models/transactionModel");

// @desc Get all financial reports
// @route GET /api/reports
// @access Private
const getReports = async (req, res) => {
  try {
    const reports = await FinancialReport.find({ user: req.user.id });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Generate a financial report
// @route POST /api/reports/generate
// @access Private
const generateReport = async (req, res) => {
  const { startDate, endDate } = req.body;

  if (!startDate || !endDate) {
    return res.status(400).json({ message: "Please provide start and end dates" });
  }

  try {
    const transactions = await Transaction.find({
      user: req.user.id,
      date: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "income") {
        totalIncome += transaction.amount;
      } else if (transaction.type === "expense") {
        totalExpenses += transaction.amount;
      }
    });

    const netProfit = totalIncome - totalExpenses;

    const report = new FinancialReport({
      user: req.user.id,
      startDate,
      endDate,
      totalIncome,
      totalExpenses,
      netProfit,
    });

    const savedReport = await report.save();
    res.status(201).json(savedReport);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getReports, generateReport };
