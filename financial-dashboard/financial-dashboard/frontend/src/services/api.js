import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const login = (userData) => API.post("/users/login", userData);
export const register = (userData) => API.post("/users/register", userData);
export const getTransactions = () => API.get("/transactions");
