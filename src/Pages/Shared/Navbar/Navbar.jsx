import { Link, NavLink } from "react-router-dom";
import './Navbar.css';
import useAuth from "../../../hooks/useAuth";


const Navbar = () => {
    const { user , logOut} = useAuth();
    const handleLogOut = () => {
		logOut()
			.then(() => {
				//				window.location.reload();
				console.log("Sign-out successful.");
				<Link to="/"></Link>;
			})
			.catch((error) => {
				console.log(error);
			});
	};
   
	const navLinks = (
		<>
			<li>
				<NavLink
					to="/"
					className={({ isActive, isPending }) =>
						isPending ? "pending" : isActive ? "active underline" : ""
					}>
					HOME
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/rooms"
					className={({ isActive, isPending }) =>
						isPending ? "pending" : isActive ? "active underline" : ""
					}>
					ROOMS
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/myBookings"
					className={({ isActive, isPending }) =>
						isPending ? "pending" : isActive ? "active underline" : ""
					}>
					MY BOOKINGS
				</NavLink>
			</li>
		</>
	);
    
    return (
        <div className="navbar  text-secondary text-xl jost lg:w-3/4 mx-auto p-5">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
            </label>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 font-semibold">
            {navLinks}
            </ul>
          </div>
          <a className="btn btn-ghost normal-case lg:text-3xl">COZYSTAY</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-6 px-1 font-medium ">
           {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
            {
                user?.email?( <>
						<button onClick={handleLogOut} className="px-5 py-2 bg-primary text-white hover:bg-[#AB916C] font-mercellus">LogOut</button>
                        </>
					
                ) : ( <>
                    <Link to='/login' className="px-5 py-2 bg-primary text-white hover:bg-[#AB916C] font-mercellus">Login</Link>
                    </>
                )
            }
           
         
        </div>
      </div>
    );
};

export default Navbar;