import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar"; 
import Dashboard from "./components/Dashboard";
import TransactionsPage from "./pages/TransactionsPage";
import Login from "./components/Login";
import Register from "./components/Register";
import FinancialPredictions from "./components/FinancialPredictions";

// Sample transactions data
const sampleTransactions = [
  { id: 1, date: "2025-03-10", description: "Salary", amount: 50000, type: "Income", category: "Salary" },
  { id: 2, date: "2025-03-12", description: "Groceries", amount: -3000, type: "Expense", category: "Furnitures" },
  { id: 3, date: "2025-03-15", description: "Rent", amount: -15000, type: "Expense", category: "Housing" },
  { id: 4, date: "2025-03-18", description: "Freelance Project", amount: 12000, type: "Income", category: "Freelance" },
];

const App = () => {
  // Initialize transactions with sample data
  const [transactions, setTransactions] = useState(sampleTransactions);

  // Function to add a new transaction
  const addTransaction = (newTransaction) => {
    setTransactions([...transactions, newTransaction]); // Update state
  };

  return (
    <Router>
      <Navbar />
      <Routes>
      
        {/* ✅ Pass addTransaction to TransactionsPage */}
        
        <Route path="/transactions" element={<TransactionsPage transactions={transactions} addTransaction={addTransaction} />} />
        <Route path="/FinancialPredictions" element={<FinancialPredictions />} />
        <Route path="/dashboard" element={<Dashboard transactions={transactions} addTransaction={addTransaction} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       
      </Routes>
    </Router>
  );
};

export default App;
