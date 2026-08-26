import axios from "axios";

export const api = axios.create({
  // створюємо власний Axios-клієнт.
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true, // Дозволяй браузеру
  // передавати cookies у запитах і приймати cookies з відповіді
  headers: {
    "Content-Type": "application/json", //відправляється JSON
  },
});

// interceptor: Перед кожним HTTP-запитом через api виконай ось цей код
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config; // config — це конфігурація поточного HTTP-запиту.
});

// Frontend Axios:
// withCredentials: true

// Backend CORS:
// credentials: true

// Обидва налаштування працюють разом.
