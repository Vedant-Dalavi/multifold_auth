# MERN Authentication System with Access & Refresh Token Management

A secure and modern user authentication system built with the **MERN stack** (MongoDB, Express, React, Node.js) using **Access Tokens**, **Refresh Tokens**, and **HTTP-only cookies** to manage authentication and session refresh securely.

## Features

- ✅ User Registration & Login with hashed passwords (bcrypt)
- ✅ Access Token + Refresh Token flow (JWT)
- ✅ Secure cookie-based refresh token storage
- ✅ Protected routes with token validation
- ✅ Token auto-refresh & expiry detection
- ✅ Responsive and animated UI (Tailwind CSS + transitions)

## Tech Stack

**Frontend**: React + Vite, Tailwind CSS, Axios  
**Backend**: Node.js + Express, MongoDB + Mongoose, JWT, Cookie-parser, CORS

## 📁 Project Structure

multifold_auth/  
├── client/ → React frontend  
| ├── src
│ ├── components/  
│ └── ...  
└── server/ → Node.js + Express backend  
 ├── controllers/  
 ├── middleware/  
 ├── models/  
 ├── routes/
└── utils/

## Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/Vedant-Dalavi/multifold_auth.git
cd multifold_auth
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` folder:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/auth_db
ACCESS_SECRET=multifold_auth_secret
REFRESH_SECRET=multifold_auth_refresh_secret
```

Run the backend:

```bash
npm start
```

### 3. Frontend Setup

```bash
cd ../client
npm install
npm run dev
```

## Authentication Flow

- On login, the server returns:
  - Access Token (stored in localStorage)
  - Refresh Token (stored in HTTP-only cookie)
- Access token is used to access protected routes.
- If access token expires, the refresh token endpoint issues a new one.
- If refresh token also expires, user is logged out.

## API Routes

| Method | Endpoint              | Description             |
| ------ | --------------------- | ----------------------- |
| POST   | /api/v1/auth/register | Register new user       |
| POST   | /api/v1/auth/login    | Login user              |
| GET    | /api/v1/auth/refresh  | Refresh access token    |
| POST   | /api/v1/auth/logout   | Clear refresh cookie    |
| GET    | /api/v1/user/me       | Get protected user data |

## Best Practices

- Access token expires quickly (e.g., 1 min) //only for testing
- Refresh token lasts longer (e.g., 2 min) //only for testing
- Refresh token is stored as `httpOnly` cookie
- Use `withCredentials: true` in Axios requests
