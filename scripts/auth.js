import { api } from "./api.js";

const form = document.querySelector("#registerForm");
const message = document.querySelector("#message");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearMessage();
        setMessage("Registering...", "info");

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const password = form.password.value;

        if (!name || !email || !password) {
            setMessage("Fill out all the fields.", "error");
            return;
        }

        try {
            await api("/auth/register", {
                method: "POST",
                body: {name, email, password},
            });

            setMessage("User created successfully! Sending you to log in...", "success");
            setTimeout(() => (window.location.href = "./login.html"), 800);
        }   catch (error) {
            setMessage(error.message || "Something went wrong with registering.", "error");
        }
    });
}

function setMessage(text, type = "info") {
    if (!message) return;
    message.textContent = text;
    message.className = type;
}
function clearMessage() {
    if (!message) return;
    message.textContent = "";
    message.className = "";
}

const loginForm = document.querySelector("#loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearMessage();
        setMessage("Logging in...", "info");

        const email = loginForm.email.value.trim();
        const password = loginForm.password.value;

        if(!email || !password) {
            setMessage("Fill out all the fields.", "error");
            return;
        }

        try {
            const result = await api("/auth/login", {
                method: "POST",
                body: { email, password},
            });

            localStorage.setItem("token", result?.data?.accessToken || result?.accessToken || "");
            localStorage.setItem("profile", JSON.stringify(result?.data || result));
            localStorage.setItem("username", result?.data?.name || result?.name || "");

            setMessage("Logged in! Sending you to the feed...", "success");
            setTimeout(() => (window.location.href = "../posts/feed.html"), 4000);
        }   catch (error) {
            setMessage(error.message || "Login failed.", "error");
        }
    });
}