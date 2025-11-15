import { api } from "./api.js";

const message = document.querySelector("#message");
const postsContainer = document.querySelector("#posts");

const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
let allPosts = [];

if (!postsContainer) {
  setMessage("posts container not found.", "error");
  throw new Error("Missing #posts element");
}

// Check if we are logged in (token required), if not send to login
const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "../auth/login.html";
}

//Get and show posts
initializeFeed();

if (searchForm && searchInput) {
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    applySearch();
  });
  searchInput.addEventListener("input", applySearch);
}

function applySearch() {
  const term = searchInput.value.trim().toLowerCase();
  if (!term) {
    clearMessage();
    renderPosts(allPosts);
    return;
  }

  const filtered = allPosts.filter((p) => {
    const t = String(p.title ?? "").toLowerCase();
    const b = String(p.body ?? "").toLowerCase();
    return t.includes(term) || b.includes(term);
  });

  if (filtered.length === 0) {
    setMessage(`No results for "${term}".`, "info");
    postsContainer.innerHTML = "";
    return;
  }

  clearMessage();
  renderPosts(filtered);
}

async function initializeFeed() {
  setMessage("Loading posts...", "info");
  try {
    const result = await api("/social/posts");
    const posts = result?.data || result;

    allPosts = Array.isArray(posts) ? posts : [];

    if (!Array.isArray(posts) || posts.length === 0) {
      setMessage("No posts to show yet.", "info");
      return;
    }

    clearMessage();
    renderPosts(posts);
  } catch (error) {
    setMessage(error.message || "Could not load posts.", "error");
  }
}

/**
 * Renders an array of post objects to the feed section.
 * Each post includes a title, body and optional image thumbnail.
 *
 * @param {Array<object>} posts - The posts to render.
 * @returns {void}
 */

function renderPosts(posts) {
  postsContainer.innerHTML = posts
    .map((post) => {
      const title = sanitize(post.title) || "(no title)";
      const body = sanitize(post.body) || "";
      const image = post.media?.url
        ? ` <a href="./post.html?id=${post.id}">
                        <img src="${post.media.url}" alt="${
            post.media.alt || "Post image"
          }" class="post-thumb">
                    </a>`
        : "";
      return `
                <article class="post-card">
                    <h2><a href="./post.html?id=${post.id}">${title}</a></h2>
                    <p>${body}</p>
                    ${image}
                </article>
            `;
    })
    .join("");
}

// setMessage & clearmessage

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

/**
 * Escapes HTML characters in a string to prevent injection or layout issues.
 *
 *
 * @param {string} value - The text to sanitize.
 * @returns {string} The cleaned and safe text.
 */

function sanitize(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
