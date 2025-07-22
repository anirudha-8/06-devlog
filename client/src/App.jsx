import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import CreatePostPage from "./pages/CreatePostPage";
import EditPostPage from "./pages/EditPostPage";
import MyPostsPage from "./pages/MyPostsPage";
import ProtectedRoute from "./components/ProtectedRoute";

const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ path: "/", element: <HomePage /> },
			{ path: "/login", element: <LoginPage /> },
			{ path: "/register", element: <RegisterPage /> },
			{ path: "/posts/:id", element: <PostDetailsPage /> },
			{
				path: "/create-post",
				element: (
					<ProtectedRoute>
						<CreatePostPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/edit-post/:id",
				element: (
					<ProtectedRoute>
						<EditPostPage />
					</ProtectedRoute>
				),
			},
			{
				path: "/my-posts",
				element: (
					<ProtectedRoute>
						<MyPostsPage />
					</ProtectedRoute>
				),
			},
		],
	},
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
