import { NavLink } from "react-router-dom"


const Navbar = () => {
   
	const navLinks = (
		<>
			<li>
				<NavLink
					to="/"
					className={({ isActive, isPending }) =>
						isPending ? "pending" : isActive ? "active  " : ""
					}>
					Home
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/rooms"
					className={({ isActive, isPending }) =>
						isPending ? "pending" : isActive ? "active " : ""
					}>
					Rooms
				</NavLink>
			</li>
			<li>
				<NavLink
					to="/myBookings"
					className={({ isActive, isPending }) =>
						isPending ? "pending" : isActive ? "active  " : ""
					}>
					My Bookings
				</NavLink>
			</li>
		</>
	);
    
    return (
        <div className="navbar  text-secondary text-xl jost">
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
          <a className="px-5 py-2 bg-primary text-white hover:bg-[#AB916C] font-mercellus">Login</a>
        </div>
      </div>
    );
};

export default Navbar;