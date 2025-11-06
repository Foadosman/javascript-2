const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

const navbar = document.createElement("nav");
navbar.innerHTML = `
    <a href="../posts/feed.html">Feed</a>
    <a href="../posts/create.html">Create</a>
    <a href="../profiles/profile.html">Profile</a>
    ${token ?`
        <span>Logged in as <strong>${username || "unknown"}</strong></span>
        <button id="logoutBtn">Log out</button>
    `   : `
        <a href="../auth/login.html">Log in</a>
        <a href="../auth/register.html">Register</a>
    `}
`;

document.body.prepend(navbar);

//log out button
const logoutBtn = document.querySelector("#logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        window.location.href = "../auth/login.html";
    });
}