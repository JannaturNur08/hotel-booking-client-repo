import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
// import axios from "axios";


const Login = () => {
    const {signIn} = useAuth();
   const navigate = useNavigate();
   const location = useLocation();
    const handleLogin = (event) => {
		event.preventDefault();
		const form = event.target;
		const email = form.email.value;
		const password = form.password.value;

		signIn(email, password)
			.then((result) => {
				const loggedInUser = result.user;
                navigate(location?.state ? location?.state : "/");

				console.log(loggedInUser);
				// navigate(from, { replace: true });

				// const user = { email };

				// //get access token
				// axios.post(
				// 		"https://car-doctor-server-three-silk.vercel.app/jwt",
				// 		user,
				// 		{
				// 			withCredentials: true,
				// 		}
				// 	)
				// 	.then((res) => {
				// 		//console.log(res.data)
				// 		if (res.data.success) {
				// 			navigate(location?.state ? location?.state : "/");
				// 		}
				// 	});
			})
			.catch((error) => console.log(error));
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
									<a
										href="#"
										className="label-text-alt link link-hover">
										Forgot password?
									</a>
								</label>
							</div>
							<div className="lg:w-1/12 w-1/2  bg-primary text-white hover:bg-[#AB916C] font-mercellus text-center py-3 text-base">
								<input
									
									type="submit"
									value="Login"
								/>
							</div>
						</form>
                        <p className="my-4">
							New User?{" "}
							<Link
								className="text-black font-bold"
								to="/signup">
								Sign Up
							</Link>{" "}
						</p>
        </div>
    );
};

export default Login;