import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Change in production

export const fetchAllCardio = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/cardio`, { headers: { Authorization: `Bearer ${token}` } });
};

export const fetchAllResistance = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/resistance`, { headers: { Authorization: `Bearer ${token}` } });
};

export const fetchAllDiet = async () => {
  const token = localStorage.getItem("token");
  return axios.get(`${API_URL}/diet`, { headers: { Authorization: `Bearer ${token}` } });
};
