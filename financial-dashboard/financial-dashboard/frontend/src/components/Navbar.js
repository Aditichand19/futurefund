import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <h2 style={styles.logo}>Finance Dashboard</h2>
      <div>
        <Link to="/Dashboard" style={styles.link}>Dashboard</Link>
        <Link to="/transactions" style={styles.link}>Transactions</Link>
        <Link to="/FinancialPredictions" style={styles.link}>Financial Predictions</Link>
        <Link to="/login" style={styles.link}>Login</Link>
        <Link to="/register" style={styles.link}>Register</Link>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px",
    background: "#2c3e50",
    color: "white",
  },
  logo: { margin: 0 },
  link: {
    margin: "0 15px",
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
  },
};

export default Navbar;
