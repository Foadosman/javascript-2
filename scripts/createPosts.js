import { api } from "./api.js";

const form = document.querySelector("#createForm");
const message = document.querySelector("#message");

//check if user is logged in
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "../auth/login.html";
}

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        clearMessage();
        setMessage("Publishing post...", "info");

        const title = form.title.value.trim();
        const body = form.body.value.trim();
        const mediaUrl = form.media.value.trim();

        if (!title || !body) {
            setMessage("Fill out title and content.", "error")
            return;
        }

        //build for API
        const postData = {
            title,
            body,
        };

        //if user has added image
        if (mediaUrl) {
            postData.media = {
                url:mediaUrl,
                alt: title || "Post image",
            };
        }

        try {
            await api("/social/posts", {
                method: "POST",
                body: postData,
            });

            setMessage("Post published! Taking you back to the feed...", "success");
            setTimeout(() => (window.location.href = "./feed.html"), 1000);
        }   catch (error) {
            setMessage(error.message || "Could not publish post.", "error");
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
    message.className ="";
}