const Transaction = require("../models/transactionModel");

// @desc Get all transactions
// @route GET /api/transactions
// @access Public (For Now)
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 }); // No user filter
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Add new transaction
// @route POST /api/transactions
// @access Public (For Now)
const addTransaction = async (req, res) => {
  const { type, amount, category, description, date } = req.body;

  if (!type || !amount || !category || !description || !date) {
    return res.status(400).json({ message: "Please fill all required fields" });
  }

  try {
    const transaction = new Transaction({
      type,
      amount,
      category,
      description,
      date,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc Delete transaction
// @route DELETE /api/transactions/:id
// @access Public (For Now)
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    await transaction.deleteOne();
    res.status(200).json({ message: "Transaction removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = { getTransactions, addTransaction, deleteTransaction };
