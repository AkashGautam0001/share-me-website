import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/shareme_banner.png";
import { jwtDecode } from "jwt-decode";
import { client } from "../client.js";

const Login = () => {
	const clientID = import.meta.env.VITE_APP_GOOGLE_API_CLIENT_ID;
	const navigate = useNavigate();

	const handleSuccess = (credentialResponse) => {
		const profileObj = jwtDecode(credentialResponse?.credential);
		const { sub, name, picture } = profileObj;

		localStorage.setItem("user", JSON.stringify(profileObj));

		const doc = {
			_id: sub,
			_type: "user",
			userName: name,
			image: picture,
		};

		console.log(doc);
		client.createIfNotExists(doc).then(() => {
			navigate("/", { replace: true });
		});
	};

	const handleError = () => {
		console.log("Login Failed");
	};
	return (
		<>
			<div className="flex justify-center items-center flex-col h-screen ">
				<div className="relative w-full h-full">
					<video
						src={shareVideo}
						type="video/mp4"
						loop
						controls={false}
						muted
						autoPlay
						className="w-full h-full object-cover opacity-80"
					/>
					<div className="absolute flex flex-col justify-center items-center left-0 right-0 top-36">
						<div className="p-5">
							<img
								src={logo}
								width="500px"
								alt="logo"
							/>
						</div>
					</div>
					<div className="absolute flex flex-col justify-center items-center left-0 right-0 bottom-60">
						<div className="absolute z-1 p-2">
							<GoogleLogin
								clientId={clientID}
								onSuccess={handleSuccess}
								onError={handleError}
								size="large"
								width={180}
								theme="filled_black"
								shape="rectangular"
							/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Login;
