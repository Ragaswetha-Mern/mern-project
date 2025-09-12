// Common HTTP utility for API requests
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");
  const headers = {
    ...options.headers,
    "Content-Type":
      options.body instanceof FormData ? undefined : "application/json",
  };

  // Only add Authorization header if token exists and not a login/register request
  if (
    token &&
    !url.includes("/api/auth/login") &&
    !url.includes("/api/auth/register")
  ) {
    headers.Authorization = `Bearer ${token}`;
  }

  const fetchOptions = {
    ...options,
    headers,
  };

  if (options.body && !(options.body instanceof FormData)) {
    fetchOptions.body = JSON.stringify(options.body);
  }

  // Use backend API base
  const res = await fetch(API_BASE + url, fetchOptions);
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
