# DevLog Backend - Setup & API Documentation

## Installation

### 1. Clone and Install Dependencies

```bash
cd server
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `server` directory:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
MONGODB_URI=mongodb://localhost:27017/devlog
PORT=8080
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### 3. Start the Server

```bash
npm run dev
```

Server will run at `http://localhost:8080`

---

## API Endpoints

### Authentication Routes (`/api/auth`)

#### Register User

- **POST** `/api/auth/register`
- **Body:**

  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```

- **Response:** `{ success: true, token: "JWT_TOKEN", user: {...} }`

#### Login User

- **POST** `/api/auth/login`
- **Body:**

  ```json
  {
    "email": "john@example.com",
    "password": "securePassword123"
  }
  ```

- **Response:** `{ success: true, token: "JWT_TOKEN", user: {...} }`

---

### Post Routes (`/api/posts`)

#### Get All Posts (Public)

- **GET** `/api/posts?search=keyword&page=1&limit=10`
- **Response:** Array of posts with pagination

#### Get Post by ID (Public)

- **GET** `/api/posts/:id`
- **Response:** Single post with author details

#### Filter Posts by Tag (Public)

- **GET** `/api/posts/tag/:tag`
- **Response:** Array of posts with specified tag

#### Create Post (Protected)

- **POST** `/api/posts`
- **Headers:** `Authorization: Bearer TOKEN`
- **Body:**

  ```json
  {
    "title": "My First Post",
    "content": "Post content here...",
    "tags": ["javascript", "web"]
  }
  ```

- **Response:** Created post with author details

#### Update Post (Protected - Author Only)

- **PUT** `/api/posts/:id`
- **Headers:** `Authorization: Bearer TOKEN`
- **Body:** Any of `{ title, content, tags }`
- **Response:** Updated post
- **Note:** Only the post author can update

#### Delete Post (Protected - Author Only)

- **DELETE** `/api/posts/:id`
- **Headers:** `Authorization: Bearer TOKEN`
- **Note:** Only the post author can delete

---

## Key Features

✅ **User Authentication** - JWT-based with bcrypt password hashing  
✅ **Post Management** - Full CRUD operations with authorization  
✅ **Search & Pagination** - Find posts by title or tags with pagination  
✅ **Author Verification** - Users can only modify their own posts  
✅ **Data Validation** - Email validation and required field checks  
✅ **Error Handling** - Comprehensive error messages and status codes  

---

## Technology Stack

- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin requests
