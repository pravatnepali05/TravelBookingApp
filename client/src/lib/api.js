// client/src/lib/api.js

// Base URL from your Vite env (e.g. http://localhost:3000)
const BASE = (import.meta.env.VITE_BASE_URL || "").replace(/\/$/, "");

// Read token from localStorage("auth")
export function authHeader() {
  try {
    const parsed = JSON.parse(localStorage.getItem("auth") || "{}");
    // support either { token } or { accessToken }
    const token = parsed?.token || parsed?.accessToken;
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

// Build a full URL from a path, but allow absolute URLs too
function buildUrl(path) {
  if (/^https?:\/\//i.test(path)) return path; // already absolute
  return `${BASE}${path.startsWith("/") ? path : `/${path}`}`;
}

async function safeText(res) {
  try {
    return await res.text();
  } catch {
    return `${res.status} ${res.statusText}`;
  }
}

export async function apiGet(path) {
  const res = await fetch(buildUrl(path), {
    headers: { ...authHeader() },
    credentials: "include",
  });
  if (!res.ok) throw new Error(await safeText(res));
  return res.json();
}

export async function apiJSON(method, path, body) {
  const res = await fetch(buildUrl(path), {
    method,
    headers: { "Content-Type": "application/json", ...authHeader() },
    body: body != null ? JSON.stringify(body) : undefined,
    credentials: "include",
  });
  if (!res.ok) throw new Error(await safeText(res));
  return res.json();
}

// Optional helper if you want a dedicated DELETE wrapper
export async function apiDelete(path) {
  const res = await fetch(buildUrl(path), {
    method: "DELETE",
    headers: { ...authHeader() },
    credentials: "include",
  });
  if (!res.ok) throw new Error(await safeText(res));
  return res.json();
}
