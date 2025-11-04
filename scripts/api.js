const BASE_URL = "https://v2.api.noroff.dev";
const API_KEY = "366c81fc-445b-4c5c-baea-4fad513762ba";

function authHeader() {
    const token = localStorage.getItem("token");
    return token ? {Authorization: `Bearer ${token}` } : {};
}

/**
 * 
 * @param {string} path - API path, f.eks. "/auth/register"
 * @param {{method?:string, headers?:Object, body?:any}} [options] 
 * @returns {Promise<any>}
 */

export async function api(path, options = {}) {
    const response = await fetch(BASE_URL + path, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            "X-Noroff-API-Key": API_KEY,
            ...authHeader(),
            ...(options.headers || {})
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
    });

    const data = await response.json().catch(() => ({}));

    if(!response.ok) {
        const message =
            data?.errors?.[0]?.message ||
            data?.message ||
            `Request failed (${response.status})`;
        throw new Error(message);
    }

    return data;
}