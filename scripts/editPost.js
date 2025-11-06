import { api } from "./api.js";

const message = document.querySelector("#message");
const form = document.querySelector("#editForm");
const deleteBtn = document.querySelector("#deleteBtn");

// required login
const token = localStorage.getItem("token");
if (!token) window.location.href = "../auth/login.html";

// get id from url
const params = new URLSearchParams(location.search);
const id = Number(params.get("id"));
if (!Number.isInteger(id)) {
    setMessage("Invalid post ID.", "error");
    throw new Error("Missing/invalid id");
}

// load existing post
initializeEdit();

async function initializeEdit() {
    setMessage("Loading post...", "info");
    try {
        const result = await api(`/social/posts/${id}`);
        const post = result?.data || result;

        document.querySelector("#title").value = post.title ?? "";
        document.querySelector("#body").value = post.body ?? "";
        document.querySelector("#media").value = post.media?.url ?? "";

        clearMessage();
    }   catch (err) {
        setMessage(err.message || "Could not load post.", "error");
    }
}

// change edits (PUT)
if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        setMessage("Saving...", "info");

        const title = document.querySelector("#title").value.trim();
        const body = document.querySelector("#body").value.trim();
        const mediaUrl = document.querySelector("#media").value.trim();

        if (!title || !body) {
            setMessage("fill out title and content.", "error");
            return;
        }

        const payload = { title, body };
        if (mediaUrl) {
            payload.media = { url: mediaUrl, alt: title || "Post image" };
        }

        try {
            await api(`/social/posts/${id}`, {
                method: "PUT",
                body: payload,
            });
            setMessage("Saved! Back to post...", "success");
            setTimeout(() => (window.location.href = `./post.html?id=${id}`), 800);
        }   catch (err) {
            setMessage(err.message  || "Could not save changes.", "error");
        }
    });
}

// delete
if (deleteBtn) {
    deleteBtn.addEventListener("click", async () => {
        const ok = confirm("Are you sure you want to delete this post?");
        if (!ok) return;
        setMessage("Deleting...", "info");
        try {
            await api(`/social/posts/${id}`, {method: "DELETE"});
            setMessage("Deleted. Back to feed...", "success");
            setTimeout(() => (window.location.href = "./feed.html"), 800);
        }   catch (err) {
            setMessage(err.message || "Could not delete post.", "error");
        }
    });
}

// setMessage & clearMessage
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