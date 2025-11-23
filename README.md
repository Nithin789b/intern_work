# 🚀 MERN Authentication API (with JWT, Cloudinary & Multer)

This project is a complete Node.js Authentication API that includes:

- User Signup with Profile Image Upload (Cloudinary)
- User Login with JWT Authentication
- Update Profile
- Get Profile
- Delete User / Admin Delete
- Protected Routes using JWT & Authorization Middleware

---

## 📦 **Technologies Used**

- Node.js
- Express.js
- MongoDB + Mongoose
- JSON Web Token (JWT)
- Bcrypt (Password Hashing)
- Multer (File Upload)
- Cloudinary (Image Storage)
- dotenv (Environment Variables)

---

# 📁 **Project Setup Guide**

Follow these steps to set up and run the backend API.

---

## 📥 1. Clone the Repository

git clone https://github.com/Nithin789b/intern_work.git


📦 2. Install Dependencies
npm install

If nodemon is missing:

npm install --save-dev nodemon

🔐 3. Create .env File

Inside the project root, create a .env file and add:

MONGO_URI=your_mongo_connection

JWT_SECRET=your_jwt_secret

CLOUDINARY_NAME=your_cloudinary_cloud_name

CLOUDINARY_API_KEY=your_cloudinary_api_key

CLOUDINARY_API_SECRET=your_cloudinary_api_secret


🚀 Running the Project
Development Mode
npm run dev
Default server URL:

http://localhost:5000
## 🔗 API Endpoints

### 🔐 Authentication & User Routes

| Method | Endpoint                         | Description                     |
|--------|----------------------------------|---------------------------------|
| POST   | /api/auth/signup                 | Register user with profile image |
| POST   | /api/auth/login                  | User login + JWT token          |
| GET    | /api/users/me                    | Get logged-in user profile      |
| PUT    | /api/users/update-profile        | Update profile + image          |
| DELETE | /api/users/delete-profile        | Delete own account              |
| DELETE | /api/users/admin/delete/:id      | Admin delete user               |

🧪 Testing With Postman

1️⃣ Signup (multipart/form-data)
| Key          | Type                   |
| ------------ | ---------------------- |
| email        | text                   |
| password     | text                   |
| displayName  | text                   |
| role         | text                   |
| occupation   | text                   |
| interests    | text (comma-separated) |
| profileImage | file                   |


2️⃣ Login (JSON)

Use Body → raw → JSON:

{
  "email": "example@gmail.com",
  "password": "yourPassword"
}

3️⃣ Protected Routes

Add the following header:

Authorization: Bearer <your_token_here>


📥 How to GET User Details
▶ Endpoint:
GET /api/users/me

▶ Headers:
Authorization: Bearer <token>

✔ Response:

Returns full user profile except password.

✏️ How to UPDATE User Profile

▶ Endpoint:

PUT /api/users/update-profile


▶ Headers:

Authorization: Bearer <token>

Content-Type: multipart/form-data

▶ Body → form-data:

| Key          | Type |
|--------------|------|
| displayName  | text |
| occupation   | text |
| interests    | text |
| profileImage | file (optional) |

✔ Allowed Updates:

Display Name

Occupation

Interests (array or comma-separated)

Profile Image (Cloudinary upload)

❌ How to DELETE Your Account

▶ Endpoint:
DELETE /api/users/delete-profile

▶ Headers:
Authorization: Bearer <token>

✔ Response:
User deleted successfully


This permanently deletes the user from MongoDB.

🔥 How Admin Can DELETE Any User
▶ Endpoint:
DELETE /api/users/admin/delete/:id

▶ Headers:
Authorization: Bearer <admin_token>

✔ Response:
User <id> deleted successfully.


If user is not admin → returns 403 Forbidden.

🧰 Scripts in package.json

"scripts": {

  "start": "node src/server.js",
  "dev": "nodemon src/server.js"
  
}

