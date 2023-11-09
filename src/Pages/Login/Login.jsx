import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";

const Login = () => {
	const { signIn } = useAuth();
	const [errors, setErrors] = useState("");
	const navigate = useNavigate();
	const location = useLocation();
	const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;
        setErrors("");
		signIn(email, password)
			.then((result) => {
				const loggedInUser = result.user;
				//navigate(location?.state ? location?.state : "/");

				console.log(loggedInUser);

				const user = { email };

				//get access token
				axios
					.post("http://localhost:3000/jwt", user, {
						withCredentials: true,
					})
					.then((res) => {
						//console.log(res.data)
						if (res.data.success) {
							toast.success("Successfully Logged in", {
								position: "top-right",
								autoClose: 5000,
								hideProgressBar: false,
								closeOnClick: true,
								pauseOnHover: true,
								draggable: true,
								progress: undefined,
								theme: "colored",
								toastId: "login-id",
							});
							navigate(location?.state?.from?.pathname || "/", { replace: true });
						}
					});
			})
			.catch((error) => {
				const errorCode = error.code;
				if (errorCode === "auth/invalid-login-credentials")
					//alert('email and password does not match' );
					setErrors("Email or password does not match");
			});
	};
	return (
		<div className="lg:w-3/4 mx-auto mt-20">
			<h2 className="font-mercellus lg:text-4xl">Login</h2>
			<form onSubmit={handleLogin}>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Email</span>
					</label>
					<input
						type="text"
						name="email"
						placeholder="email"
						className="input input-bordered rounded"
					/>
				</div>
				<div className="form-control">
					<label className="label">
						<span className="label-text">Password</span>
					</label>
					<input
						type="password"
						name="password"
						placeholder="password"
						className="input input-bordered rounded"
					/>
					<label className="label">
						<a href="#" className="label-text-alt link link-hover">
							Forgot password?
						</a>
					</label>
					<p className="text-left font-bold text-red-700">
							{errors}
						</p>
				</div>
				<div className="lg:w-1/12 w-1/2  bg-primary text-white hover:bg-[#AB916C] font-mercellus text-center py-3 text-base">
					<input type="submit" value="Login" />
				</div>
				<ToastContainer></ToastContainer>
			</form>
			<p className="my-4">
				New User?{" "}
				<Link className="text-black font-bold" to="/signup">
					Sign Up
				</Link>{" "}
			</p>
		</div>
	);
};

export default Login;
