import { useState } from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login.jsx";
import Home from "./container/Home.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

function App() {
	const clientID = import.meta.env.VITE_APP_GOOGLE_API_CLIENT_ID;
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
