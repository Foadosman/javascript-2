const token = localStorage.getItem("token");
const username = localStorage.getItem("username");

const nav = document.createElement("nav");
nav.className = "nav";

nav.innerHTML = `
    <div class="nav-inner">
        <a class="nav-logo" href="../posts/feed.html">
            <img src="../../assets/logo/place2be-logo.svg" alt="Place2be-logo" class="logo-img">
        </a>
        
        <div class="nav-center">
            <button class="nav-burger" aria-label="Toggle menu" aria-expanded="false">&#9776;</button>
            <ul class="nav-links">
                <li><a href="../posts/feed.html">Feed</a></li>
                <li><a href="../posts/create.html">Create</a></li>
                <li><a href="../profiles/profile.html">Profile</a></li>

                ${
                  token
                    ? `
                        <li class="nav-mobile-only"><span class="nav-user">Logged in as <strong>${username}</strong></span></li>
                        <li class="nav-mobile-only"><button id="logoutBtnMobile" class="nav-logout">Log out</button></li>
                    `
                    : `
                        <li class="nav-mobile-only"><a href="../auth/login.html">Log in</a></li>
                        <li class="nav-mobile-only"><a href="../auth/register.html">Register</a></li>
                `
                }
            </ul>
        </div>

        <div class="nav-right">
            ${
              token
                ? `
                    <span class="nav-user">Logged in as <strong>${username}</strong></span>
                    <button id="logoutBtn" class="nav-logout">Log out</button>
                `
                : `
                    <li class="nav-mobile-only"><a href="../auth/login.html">Log in</a></li>
                    <li class="nav-mobile-only"><a href="../auth/register.html">Register</a></li>
            `
            }
        </div>
    </div>
`;
document.body.prepend(nav);

//log out
const logoutBtn = document.querySelector("#logoutBtn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("profile");
    window.location.href = "../auth/login.html";
  });
}

const logoutBtnMobile = document.querySelector("#logoutBtnMobile");
if (logoutBtnMobile) {
  logoutBtnMobile.addEventListener("click", () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("profile");
    window.location.href = "../auth/login.html";
  });
}

const burger = nav.querySelector(".nav-burger");
const links = nav.querySelector(".nav-links");
if (burger && links) {
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("open");
    burger.setAttribute("aria-expanded", String(open));
  });
}
