import axios from "axios";

const API = axios.create({
  baseURL: "https://notes-app-backend-ad9w.onrender.com/api",
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");

  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }

  return req;
});

export default API;