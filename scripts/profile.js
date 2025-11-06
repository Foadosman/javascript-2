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
        const result = await api (`/social/profiles/${username}?_followers=true&_following=true&_posts=true`);
        const profile = result?.data || result;

        clearMessage();

        profileInfo.innerHTML = `
            <img src="${profile.avatar?.url || "https://placehold.co/100"}"
                alt="${profile.avatar?.alt || "Profile image"}" width="100">
            <h2>${profile.name}</h2>
            <p>Email: ${profile.email}</p>
            <p>Bio: ${profile.bio || "No bio yet."}</p>
            <p>Followers: ${profile._count?.followers || 0}</p>
            <p>Following: ${profile._count?.following || 0}</p>
            <p>Posts: ${profile._count?.posts || 0}</p>
        `;
    }   catch (err) {
        setMessage(err.message || " Could not load profile.", "error");
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
    message.className ="";
}