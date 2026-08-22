// Centralized API configuration for Mayleki Frontend
const configuredApiUrl = import.meta.env.VITE_API_URL;
const API_URL =
  configuredApiUrl ||
  (import.meta.env.PROD
    ? "https://mayleki-imitation.onrender.com"
    : "http://localhost:5000");

// Ensure no trailing slash
export const API_BASE_URL = API_URL.replace(/\/+$/, "");

/**
 * Helper utility for API requests with automatic JSON parsing and error handling
 */
export async function fetchAPI(endpoint, options = {}) {
  const url = endpoint.startsWith("http")
    ? endpoint
    : `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  // Attach JWT token if available in localStorage
  const token = localStorage.getItem("mayleki_token");
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    credentials: options.credentials || "include",
  };

  const response = await fetch(url, config);
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(data.message || `Request failed with status ${response.status}`);
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
}

export default API_BASE_URL;
