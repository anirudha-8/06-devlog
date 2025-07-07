# 📝 DevLog – A Blogging Platform for Developers

DevLog is a full-stack blogging platform that enables developers to share their thoughts, tutorials, and technical insights. Built using **MERN Stack (MongoDB, Express, React, Node.js)** with features like authentication, CRUD operations, search, filter by tags, and pagination.

---

## 🚀 Features

### ✅ Backend

- User authentication using JWT

- Password hashing with bcrypt

- Create, read, update, and delete (CRUD) posts

- Search posts by keyword (title or tags)

- Filter posts by specific tags

- Pagination for fetching posts

- Secure routes using middleware

- MongoDB with Mongoose ODM

---

## 📁 Folder Structure

```js
devlog/
├── server/
│ ├── controllers/
│ │ ├── authController.js
│ │ └── postController.js
│ ├── middlewares/
│ │ └── authMiddleware.js
│ ├── models/
│ │ ├── Post.js
│ │ └── User.js
│ ├── routes/
│ │ ├── authRoutes.js
│ │ └── postRoutes.js
│ ├── config/
│ │ └── db.js
│ ├── .env
│ ├── index.js
│ └── package.json
```

---

## 🧪 API Endpoints

### 🧍 Auth

| Method | Endpoint            | Description            |
|--------|---------------------|------------------------|
| POST   | `/api/auth/register` | Register a new user   |
| POST   | `/api/auth/login`    | Login and get a token |

### 📝 Posts

| Method | Endpoint               | Description                           |
|--------|------------------------|---------------------------------------|
| GET    | `/api/posts`           | Get all posts (with search + pagination) |
| GET    | `/api/posts/:id`       | Get a single post by ID               |
| GET    | `/api/posts/tag/:tag`  | Get posts filtered by tag             |
| GET    | `/api/posts/mine`      | Get posts created by the logged-in user |
| POST   | `/api/posts`           | Create a new post (auth required)     |
| PUT    | `/api/posts/:id`       | Update a post (auth required)         |
| DELETE | `/api/posts/:id`       | Delete a post (auth required)         |

---

## 🔐 Environment Variables

Create a `.env` file inside the `/server` directory:

```env
PORT=8080
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

## 📦 Installation & Setup

```bash
# Clone the repo
git clone https://github.com/yourusername/devlog.git

# Navigate to server directory
cd devlog/server

# Install dependencies
npm install

# Run the server in development mode
npm run dev
```

---

## 🧑‍💻 Tech Stack

- **Backend**: Node.js, Express.js

- **Database**: MongoDB Atlas, Mongoose

- **Authentication**: JWT (JSON Web Token)

- **Dev Tools**: Postman, Nodemon, dotenv

---

## 🧔 Author

***Anirudha Bele***

>Aspiring Full-Stack Web Developer | Passionate about clean code and problem-solving

📧 Email: <anirudhabele@email.com>
🔗 GitHub: @anirudha-8

---

## 📄 License

This project is licensed under the MIT License — see the LICENSE file for details.
