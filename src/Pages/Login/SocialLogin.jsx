import useAuth from "../../hooks/useAuth";
import {FcGoogle } from "react-icons/fc";


const SocialLogin = () => {
    const { googleSignIn} = useAuth();
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
            })
            .catch(error => console.log(error))
    }
    return (
       <div>
         
         <div className=" mt-3 ">
					<button
						onClick={handleGoogleSignIn}
						className="btn btn-outline ">
						<FcGoogle></FcGoogle>
						Login with Google
					</button>
				</div>
       </div>
    );
};

export default SocialLogin;