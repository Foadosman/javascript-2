import { api } from "./api.js";

const message = document.querySelector("#message");
const profileInfo = document.querySelector("#profileInfo");

// Required login
const token = localStorage.getItem("token");
const username = localStorage.getItem("username");
if (!token || !username) {
  window.location.href = "../auth/login.html";
}

loadProfile();

async function loadProfile() {
  setMessage("Loading profile...", "info");
  try {
    const result = await api(
      `/social/profiles/${username}?_followers=true&_following=true&_posts=true`
    );
    const profile = result?.data || result;

    clearMessage();

    profileInfo.innerHTML = `
            <img src="${profile.avatar?.url || "https://placehold.co/100"}"
                alt="${profile.avatar?.alt || "Profile image"}" width="100">
            <h2>${profile.name}</h2>
            <p><strong>Email:</strong> ${profile.email}</p>
            <p><strong>Bio:</strong> ${profile.bio || "No bio yet."}</p>
            <p><strong>Followers:</strong> ${profile._count?.followers || 0}</p>
            <p><strong>Following:</strong> ${profile._count?.following || 0}</p>
            <p><strong>Posts:</strong> ${profile._count?.posts || 0}</p>
        `;

    await loadMyPosts();
  } catch (err) {
    setMessage(err.message || " Could not load profile.", "error");
  }
}

async function loadMyPosts() {
  const myPostsContainer = document.querySelector("#myPosts");
  myPostsContainer.innerHTML = "<h2>My posts</h2><p>Loading your posts...</p>";

  try {
    const result = await api(`/social/profiles/${username}/posts`);
    const posts = result?.data || result;

    if (!Array.isArray(posts) || posts.length === 0) {
      myPostsContainer.innerHTML =
        "<h2>My posts</h2><p>You have no posts yet.</p>";
      return;
    }

    myPostsContainer.innerHTML = `
            <h2>My posts</h2>
            ${posts
              .map(
                (post) => `
                    <article class="post-card">
                        <h3><a href="../posts/post.html?id=${post.id}">${
                  sanitize(post.title) || "(no title)"
                }</a></h3>
                        <p>${sanitize(post.body) || ""}</p>
                    </article>
                `
              )
              .join("")}
        `;
  } catch (err) {
    myPostsContainer.innerHTML = `<p class="error">${
      err.message || "Could not load your posts."
    }</p>`;
  }
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

function sanitize(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}
