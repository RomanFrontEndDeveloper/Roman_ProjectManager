import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // бекенд
  withCredentials: true, // дозволяє працювати з cookie
  headers: {
    "Content-Type": "application/json",
  },
});

// Frontend Axios:
// withCredentials: true

// Backend CORS:
// credentials: true

// Обидва налаштування працюють разом.
