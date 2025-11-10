import { api} from "./api.js";

const message = document.querySelector("#message");
const postContainer = document.querySelector("#post");

//Get ID from URL
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    setMessage("No post-ID found in URL.", "error");
    throw new Error("Missing post ID");
}

initializePost();

async function initializePost() {
    setMessage("Loading post...", "info");
    try {
        const result = await api(`/social/posts/${id}?_author=true`);
        const post = result?.data || result;
        clearMessage();
        renderPost(post);
    } catch (error) {
        setMessage(error.message || "could not load post.", "error");
    }
}

function renderPost(post) {
    const title = sanitize(post.title) || "(No title)";
    const body = sanitize(post.body) || "";
    const author = post.author?.name || "unknown";
    const media = post.media?.url
        ? `<img src="${post.media.url}" alt="${post.media.alt || "Post image"}">`
        : "";

    postContainer.innerHTML = `
    <h2>${title}</h2>
    <p><strong>by:</strong> ${author}</p>
    ${media}
    <p>${body}</p>
    `;
}

//message functions
function setMessage(text, type = "info") {
    if(!message) return;
    message.textContent = text;
    message.className = type;
}
function clearMessage() {
    if (!message) return;
    message.textContent = "";
    message.className = "";
}
function sanitize(value) {
    return String(value ?? "")
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;");
}