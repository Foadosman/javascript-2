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