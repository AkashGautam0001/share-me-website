import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./container/Home.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { fetchUser } from "./utils/fetchUser.js";

function App() {
	const clientID = import.meta.env.VITE_APP_GOOGLE_API_CLIENT_ID;
	const navigate = useNavigate();
	useEffect(() => {
		const user = fetchUser();
		if (!user) navigate("/login");
	}, []);
	return (
		<>
			<GoogleOAuthProvider clientId={clientID}>
				<Routes>
					<Route
						path="login"
						element={<Login />}
					/>
					<Route
						path="/*"
						element={<Home />}
					/>
				</Routes>
			</GoogleOAuthProvider>
		</>
	);
}

export default App;
