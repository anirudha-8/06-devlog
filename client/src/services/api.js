import axios from "axios";

const API = axios.create({
	baseURL: "http://localhost:8080/api", // adjust if using a different port
	headers: {
		"Content-Type": "application/json",
	},
});

export default API;
