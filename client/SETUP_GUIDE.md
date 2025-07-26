# DevLog Frontend - Setup & Usage Guide

## Installation

### 1. Install Dependencies

```bash
cd client
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The frontend will run at `http://localhost:5173`

### 3. Build for Production

```bash
npm run build
```

---

## Features

✅ **User Authentication** - Register, login, and logout functionality
✅ **Post Management** - Create, read, update, and delete posts
✅ **My Posts** - View and manage your own posts
✅ **Search & Filter** - Find posts by title or tags
✅ **Responsive Design** - Works on desktop and mobile
✅ **Protected Routes** - Authenticated pages require login
✅ **JWT Token Management** - Automatic token handling with interceptors

---

## Project Structure

```js
client/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx              # Navigation bar with auth status
│   │   └── ProtectedRoute.jsx      # Route guard for authenticated pages
│   ├── contexts/
│   │   └── AuthContext.jsx         # Global auth state management
│   ├── hooks/
│   │   └── useAuth.js              # Custom hook for auth context
│   ├── layouts/
│   │   └── MainLayout.jsx          # Main layout with navbar and outlet
│   ├── pages/
│   │   ├── HomePage.jsx            # Display all posts
│   │   ├── LoginPage.jsx           # User login
│   │   ├── RegisterPage.jsx        # User registration
│   │   ├── PostDetailsPage.jsx     # Single post view
│   │   ├── CreatePostPage.jsx      # Create new post (protected)
│   │   ├── EditPostPage.jsx        # Edit existing post (protected)
│   │   └── MyPostsPage.jsx         # User's posts dashboard (protected)
│   ├── services/
│   │   └── api.js                  # Axios instance with JWT interceptor
│   ├── App.jsx                     # Main app with routes
│   ├── main.jsx                    # Entry point with AuthProvider
│   └── index.css                   # Tailwind CSS imports
├── index.html
├── package.json
└── vite.config.js
```

---

## Technologies Used

- **React 19** - UI framework
- **React Router v7** - Client-side routing
- **Axios** - HTTP client with JWT interceptor
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Build tool and dev server

---

## API Integration

The frontend integrates with the backend API at `http://localhost:8080/api`

### Key Endpoints Used

**Authentication:**

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

**Posts:**

- `GET /api/posts` - Fetch all posts with pagination
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (protected)
- `PUT /api/posts/:id` - Update post (protected)
- `DELETE /api/posts/:id` - Delete post (protected)
- `GET /api/posts/tag/:tag` - Filter posts by tag

---

## Authentication Flow

1. User registers/logs in
2. Backend returns JWT token and user info
3. AuthContext stores token and user
4. API interceptor automatically adds token to all requests
5. ProtectedRoute checks if user is authenticated
6. User can create, edit, delete posts
7. Logout clears token and user from context

---

## Customization

### Change API URL

Edit [client/src/services/api.js](client/src/services/api.js#L3):

```javascript
const API = axios.create({
  baseURL: "your-api-url/api",
  // ...
});
```

### Update Styling

- Edit [client/src/index.css](client/src/index.css) for Tailwind imports
- Modify Tailwind classes in component files
- Update color schemes in components

---

## Troubleshooting

**Login not working:**

- Ensure backend server is running on `http://localhost:8080`
- Check browser console for error messages
- Verify credentials are correct

**Posts not loading:**

- Check if MongoDB connection is working
- Verify backend API is accessible
- Check browser DevTools Network tab

**Protected routes redirecting to login:**

- Clear localStorage: `localStorage.clear()`
- Re-login with valid credentials
- Ensure JWT token is valid

---

## Development Tips

- **Hot Reload**: Vite automatically refreshes on file changes
- **DevTools**: Use React DevTools to inspect components and context
- **Network Tab**: Use browser DevTools to debug API calls
- **Console**: Check console for errors and warnings

---

## Build & Deploy

### Production Build

```bash
npm run build
```

This creates a `dist/` folder ready for deployment to services like:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

---

## Next Steps

To enhance this project:

1. Add search/filter functionality on posts
2. Implement comment system on posts
3. Add user profiles with bio
4. Add pagination UI
5. Implement dark mode
6. Add post draft functionality
7. Add notification system
8. Implement post recommendations

---

Happy coding! 🚀
