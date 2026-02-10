import axios from "axios";

const API = "http://localhost:5000/api/mail"; // backend URL

export const getHistory = () => axios.get(`${API}/history`);
export const sendMail = (data) => axios.post(`${API}/send`, data);