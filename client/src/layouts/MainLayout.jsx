import { Outlet } from "react-router-dom";

const MainLayout = () => {
	return (
		<div className="min-h-screen bg-gray-100 text-gray-900">
			{/* TODO: Add Navbar later */}
			<main className="container mx-auto px-4 py-6">
				<Outlet />
			</main>
		</div>
	);
};

export default MainLayout;
