const BASE_URL = "https://v2.api.noroff.dev";

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