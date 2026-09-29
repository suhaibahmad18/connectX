import axios from "axios";

// Empty baseURL = same origin (the Vite dev proxy); set VITE_API_URL when the API lives elsewhere.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "",
  withCredentials: true,
});

// A 401 means the httpOnly session cookie is missing/expired; drop the stale local user and re-login.
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && localStorage.getItem("ChatApp")) {
      localStorage.removeItem("ChatApp");
      window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);

export default api;
