import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import {FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";


const SocialLogin = () => {
    const { googleSignIn} = useAuth();
    const navigate = useNavigate();
    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                console.log(result.user);
                Swal.fire({
					title: "Success!",
					text: "Google logged in Successfully",
					icon: "success",
					confirmButtonText: "Confirmed",
				});
                navigate('/');
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