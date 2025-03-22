import React, { useState } from "react";
import "../App.css";
import { Pie, Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

// Register chart elements
Chart.register(ArcElement, Tooltip, Legend);

const Transactions = () => {
  // Sample transactions
  const [transactions, setTransactions] = useState([
    { id: 1, date: "2025-03-18", description: "Employee Salary", amount: 2000, type: "Income", category: "Salary" },
    { id: 2, date: "2025-03-20", description: "Furnitures", amount: -500, type: "Expense", category: "Furnitures" },
    { id: 3, date: "2025-03-21", description: "Electricity Bill", amount: -700, type: "Expense", category: "Bills" },
    { id: 4, date: "2025-03-21", description: "Machinary", amount: -1200, type: "Expense", category: "Machinary" },
    { id: 5, date: "2025-03-21", description: "Offices", amount: -850, type: "Expense", category: "Offices" },
    { id: 6, date: "2025-03-21", description: "Technical Experties", amount: -300, type: "Expense", category: "Technical" },
  ]);

  // Transaction form state
  const [newTransaction, setNewTransaction] = useState({
    date: "",
    description: "",
    amount: "",
    type: "Expense",
    category: "Furnitures",
  });

  const [showForm, setShowForm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  // Predefined categories
  const categories = ["Furnitures", "Bills", "Machinary", "Offices", "Technical", "Salary"];

  // Handle form input changes
  const handleInputChange = (e) => {
    setNewTransaction({ 
      ...newTransaction, 
      [e.target.name]: e.target.name === "amount" ? Number(e.target.value) : e.target.value
    });
  };

  // Add a new transaction
  const addTransaction = (transaction) => {
    setTransactions([...transactions, transaction]);
  };

  // Update an existing transaction
  const updateTransaction = (id, updatedTransaction) => {
    setTransactions(
      transactions.map((txn) =>
        txn.id === id ? { ...txn, ...updatedTransaction } : txn
      )
    );
  };

  // Delete a transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((txn) => txn.id !== id));
  };

  // Handle save or update transaction
  const handleSaveTransaction = () => {
    if (!newTransaction.date || !newTransaction.description || !newTransaction.amount) {
      alert("Please fill in all fields.");
      return;
    }

    if (isEditing) {
      updateTransaction(editId, newTransaction);
    } else {
      addTransaction({
        id: transactions.length + 1,
        ...newTransaction,
        amount: Number(newTransaction.amount),
      });
    }

    // Reset form and hide
    setNewTransaction({ date: "", description: "", amount: "", type: "Expense", category: "Furnitures" });
    setShowForm(false);
    setIsEditing(false);
    setEditId(null);
  };

  // Handle edit button click
  const handleEdit = (txn) => {
    setNewTransaction(txn);
    setShowForm(true);
    setIsEditing(true);
    setEditId(txn.id);
  };

  // Predefined colors for categories
  const categoryColors = {
    Furnitures: "#FF6384",
    Salary: "#36A2EB",
    Bills: "#FFCE56",
    Machinary: "#4BC0C0",
    Offices: "#9966FF",
    Technical : "#FF9F40",
  };

  // Compute totals for each category
  const categoryTotals = transactions.reduce((acc, txn) => {
    acc[txn.category] = (acc[txn.category] || 0) + Math.abs(txn.amount);
    return acc;
  }, {});

  // Chart data
  const pieChartData = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        data: Object.values(categoryTotals),
        backgroundColor: Object.keys(categoryTotals).map(
          (category) => categoryColors[category] || "#999999"
        ),
      },
    ],
  };

  return (
    <div className="transactions-container">
      <h2>Transactions</h2>

      {/* Add Transaction Button */}
      <button className="add-btn" onClick={() => { setShowForm(!showForm); setIsEditing(false); }}>
        {showForm ? "Cancel" : "➕ Add Transaction"}
      </button>

      {/* Transaction Form */}
      {showForm && (
        <div className="transaction-form">
          <input type="date" name="date" value={newTransaction.date} onChange={handleInputChange} />
          <input type="text" name="description" placeholder="Description" value={newTransaction.description} onChange={handleInputChange} />
          <input type="number" name="amount" placeholder="Amount" value={newTransaction.amount} onChange={handleInputChange} />
          <select name="type" value={newTransaction.type} onChange={handleInputChange}>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
          <select name="category" value={newTransaction.category} onChange={handleInputChange}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <button className="save-btn" onClick={handleSaveTransaction}>
            {isEditing ? "Update" : "Save"}
          </button>
        </div>
      )}

      {/* Table */}
      <table className="transactions-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.date}</td>
              <td>{txn.description}</td>
              <td className={txn.amount < 0 ? "expense" : "income"}>{txn.amount}</td>
              <td>{txn.type}</td>
              <td>{txn.category}</td>
              <td>
                <button className="edit-btn" onClick={() => handleEdit(txn)}>✏️</button>
                <button className="delete-btn" onClick={() => deleteTransaction(txn.id)}>❌</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Charts Section */}
      <div className="charts-container">
        <div className="chart">
          <h3>Spending Breakdown (Pie Chart)</h3>
          <Pie data={pieChartData} />
        </div>

        <div className="chart">
          <h3>Expense Distribution (Doughnut Chart)</h3>
          <Doughnut data={pieChartData} />
        </div>
      </div>
    </div>
  );
};

export default Transactions;