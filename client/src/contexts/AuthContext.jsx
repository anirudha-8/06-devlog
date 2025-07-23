import { createContext, useState, useEffect, useCallback } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [loading, setLoading] = useState(true);

	// Initialize auth from localStorage on mount
	useEffect(() => {
		const storedToken = localStorage.getItem("token");
		const storedUser = localStorage.getItem("user");

		if (storedToken && storedUser) {
			setToken(storedToken);
			setUser(JSON.parse(storedUser));
		}
		setLoading(false);
	}, []);

	const login = useCallback((token, user) => {
		setToken(token);
		setUser(user);
		localStorage.setItem("token", token);
		localStorage.setItem("user", JSON.stringify(user));
	}, []);

	const logout = useCallback(() => {
		setToken(null);
		setUser(null);
		localStorage.removeItem("token");
		localStorage.removeItem("user");
	}, []);

	const isAuthenticated = !!token;

	const value = {
		user,
		token,
		loading,
		isAuthenticated,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={value}>
			{children}
		</AuthContext.Provider>
	);
};
