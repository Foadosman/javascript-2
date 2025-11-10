import { api } from "./api.js";

const message = document.querySelector("#message");
const userPosts = document.querySelector("#userPosts");
const usernameTitle = document.querySelector("#usernameTitle");

const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "../auth/login.html";
}

//get username from url
const params = new URLSearchParams(location.search);
const username = params.get("name");

if (!username) {
    setMessage("No username specified.", "error");
    throw new Error("Missing ?name=username in URL");
}

usernameTitle.textContent = `${username}'s posts`;

loadUserPosts();

async function loadUserPosts() {
    setMessage("Loading posts...", "info");
    try {
        const result = await api(`/social/profiles/${username}/posts`);
        const posts = result?.data || result;

        if (!Array.isArray(posts) || posts.length === 0) {
            setMessage("This user has no posts yet.", "info");
            userPosts.innerHTML = "";
            return;
        }

        clearMessage();
        userPosts.innerHTML = posts
            .map((post) => {
                const title = sanitize(post.title) || "(no title)";
                const body = sanitize(post.body) || "";
                return `
                    <article class="post-card">
                        <h2><a href="../posts/post.html?id=${post.id}">${title}</a></h2>
                        <p>${body}</p>
                    </article>
                `;
            })
            .join("");
    }   catch (err) {
        setMessage(err.message || "Could not load user posts.", "error");
    }
}

// Follow / Unfollow
const followBtn = document.querySelector("#followBtn");

if (followBtn) {
    followBtn.addEventListener("click", async () => {
        try {
            followBtn.disabled = true;
            const isFollowing = followBtn.textContent === "Unfollow";
            const endpoint = `/social/profiles/${username}/${isFollowing ? "unfollow" : "follow"}`;

            await api(endpoint, {method: "PUT"});

            followBtn.textContent = isFollowing ? "Follow" : "Unfollow";
        }   catch(err) {
            setMessage(err.message || "Could not update follow status.", "error");
        }   finally {
            followBtn.disabled = false;
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
// sanitizer avoids wierd text

function sanitize(value) {
    return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}