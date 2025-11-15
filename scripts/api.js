const BASE_URL = "https://v2.api.noroff.dev";
const API_KEY = "366c81fc-445b-4c5c-baea-4fad513762ba";

function authHeader() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Makes an HTTP request to the Noroff API.
 * Automatically includes headers like API key and the Authorization token.
 *
 * @param {string} path - The API endpoint  (e.g. "/social/posts").
 * @param {object} [options] - Optional settings for the request.
 * @param {string} [options.method="GET"] - HTTP method (GET, POST, PUT, DELETE).
 * @param {object} [options.headers] - Extra headers for the request.
 * @param {object} [options.body] - JSON body to send with the request.
 * @returns {Promise<object>} The JSON response from the API.
 * @throws {Error} If the request fails or returns a non-OK status.
 */

export async function api(path, options = {}) {
  const response = await fetch(BASE_URL + path, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Noroff-API-Key": API_KEY,
      ...authHeader(),
      ...(options.headers || {}),
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const message =
      data?.errors?.[0]?.message ||
      data?.message ||
      `Request failed (${response.status})`;
    throw new Error(message);
  }

  return data;
}
