# SWETHA MART

This is a Node.js Express backend for user authentication and profile management, using MongoDB as the database.

## How to Run
1. Install dependencies:
   ```
   npm install
   ```
2. Start MongoDB server locally (default: `mongodb://127.0.0.1:27017/SwethaDb`).
3. Start the backend:
   ```
   npm start
   ```

## Sample API Request
### Create User Profile
**POST** `/api/v1/User/CreateProfile`

**Request Body:**
```json
{
  "name": "Swetha",
  "email": "swetha@example.com",
  "password": "password123",
  "avator": "https://example.com/avatar.png"
}
```

**Sample Response:**
```json
{
  "success": true,
  "user": {
    "_id": "64f8c2e2b2e4c2a1d8e4c2a1",
    "name": "Swetha",
    "email": "swetha@example.com",
    "avator": "https://example.com/avatar.png",
    "role": "user",
    "createdAt": "2025-09-07T10:00:00.000Z"
  },
  "token": "<JWT_TOKEN>"
}
```

## Environment Variables
See `config/config.env` for configuration options.

---
For more API endpoints, see the routes in `routes/authRoute.js`.

## Here Base Url is https://jwtservice.onrender.com
## GET USER: {{base_url}}/api/v1/User/GetProfileById/68bca65d44cd4a38712980f2

## LOGIN: {{base_url}}/api/v1/User/Login
{
    "email": "swetha@example.com",
    "password": "Sripada2498"
}

## LOGOUT: {{base_url}}/api/v1/User/Logout
## This will remove the saved cookies via cookie parser npm