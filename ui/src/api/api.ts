import axios from "axios";

const BASE_URL = import.meta.env.VITE_BASE_URL || "/api";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
