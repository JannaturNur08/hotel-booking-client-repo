
import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import SocialLogin from '../Login/SocialLogin';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const{ createUser} = useAuth();

    const handleSignUp = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        console.log(name, email, password)


        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log('created user', user)
                Swal.fire(
                    'Good job!',
                    'You signed up successfully!',
                    'success'
                )
            })
            .catch(error => console.log(error))

    }
    return (
        <div className="lg:w-3/4 mx-auto mt-20">
            <h2 className="font-mercellus lg:text-4xl">SignUp</h2>
           <form onSubmit={handleSignUp}>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name='name' placeholder="name" className="input input-bordered rounded" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="text" name='email' placeholder="email" className="input input-bordered rounded" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" name='password' placeholder="password" className="input input-bordered rounded" />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="lg:w-1/12 w-1/2  bg-primary text-white hover:bg-[#AB916C] font-mercellus text-center py-3 text-base">
								<input
									
									type="submit"
									value="SignUp"
								/>
							</div>
                        </form> 
                        <p className='my-4'>Already Have an Account? <Link className='text-black font-bold' to="/login">Login</Link> </p>
                        <SocialLogin></SocialLogin>
                        </div>
    );
};

export default SignUp;