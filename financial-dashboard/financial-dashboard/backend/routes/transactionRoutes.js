const Transaction = require("../models/Transaction");

// @desc Get all transactions
// @route GET /api/transactions
// @access Private
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }); // Fetch transactions for the logged-in user
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Add a new transaction
// @route POST /api/transactions
// @access Private
const addTransaction = async (req, res) => {
  const { date, description, amount, type } = req.body;

  if (!date || !description || !amount || !type) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  try {
    const transaction = new Transaction({
      user: req.user.id, // Associate with the logged-in user
      date,
      description,
      amount,
      type,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc Delete a transaction
// @route DELETE /api/transactions/:id
// @access Private
const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    // Ensure the user deleting the transaction is the owner
    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { getTransactions, addTransaction, deleteTransaction };
