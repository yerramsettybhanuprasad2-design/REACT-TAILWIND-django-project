import axios from "axios";

function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  return null;
}

const api = axios.create({
  baseURL: "http://localhost:8000/api/",
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    const method = (config.method || "").toUpperCase();
    if (["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
      const token =
        getCookie("csrftoken") || getCookie("csrf_token") || getCookie("csrf");
      if (token) config.headers["X-CSRFToken"] = token;
    }
    return config;
  },
  (err) => Promise.reject(err)
);

export async function ensureCSRF() {
  try {
    await fetch("http://localhost:8000/api/auth/csrf/", {
      credentials: "include",
    });
  } catch (e) {
    console.warn("CSRF endpoint failed", e);
  }
}

export default api;
