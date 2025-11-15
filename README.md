# Place2Be – Social Media App

A simple social media client built as part of the JavaScript 2 Course Assignment at Noroff.  
Users can register, log in, create posts, edit posts, delete posts, view a feed, and see profiles and user posts.

## Features

- Register new user
- Log in / log out (token saved in `localStorage`)
- View all posts (feed)
- View a single post
- Create a post
- Edit own posts
- Delete own posts
- View own profile
- View another user’s profile and posts
- Follow / unfollow users
- Search posts by title and body
- Basic responsive layout with navbar and footer
- Status messages for success / error / info

## Technologies Used

- HTML
- CSS (`styles/main.css`)
- JavaScript (ES modules)
- Noroff API v2 (`https://docs.noroff.dev/docs/v2`)

## Project Structure

```text
/
├── assets/
│   └── logo/
│       └── place2be-logo.svg
├── pages/
│   ├── auth/
│   │   ├── login.html
│   │   └── register.html
│   ├── posts/
│   │   ├── feed.html
│   │   ├── create.html
│   │   ├── edit.html
│   │   └── post.html
│   └── profiles/
│       ├── profile.html
│       └── user.html
├── scripts/
│   ├── api.js
│   ├── auth.js
│   ├── createPost.js
│   ├── editPost.js
│   ├── feed.js
│   ├── navbar.js
│   ├── footer.js
│   ├── post.js
│   ├── profile.js
│   └── user.js
├── styles/
│   └── main.css
├── index.html
└── README.md
```

## How to Run

1. Clone or download the repository.
2. Open the project in VS Code.
3. Use **Live Server** (or similar) and open `pages/posts/feed.html`.
4. Register a new user, log in, and start creating posts.

## API

This project uses the Noroff API v2:

- `POST /auth/register`
- `POST /auth/login`
- `GET /social/posts`
- `POST /social/posts`
- `PUT /social/posts/{id}`
- `DELETE /social/posts/{id}`
- `GET /social/profiles/{name}`
- `GET /social/profiles/{name}/posts`
- `PUT /social/profiles/{name}/follow`
- `PUT /social/profiles/{name}/unfollow`

The API key and base URL are configured in `scripts/api.js`.  
The auth token is stored in `localStorage` after login and sent automatically in requests.

## Known Limitations

- Styling is basic and focused on meeting assignment requirements.
- Images are added via URL only (no file upload).
- No comments or reactions (not required for solo assignment).

## Deployment

Live site URL:  
`https://place2be.netlify.app/`

## Author

`https://github.com/Foadosman`

## Repository
`https://github.com/Foadosman/javascript-2`

