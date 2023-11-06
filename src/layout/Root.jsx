import { Outlet } from "react-router-dom";
import Navbar from "../Pages/Shared/Navbar/Navbar";
import Footer from "../Pages/Shared/Footer/Footer";

const Root = () => {
	return (
		<div className="font-jost mx-auto ">
			<Navbar></Navbar>
            <Outlet></Outlet>
			<Footer></Footer>
		</div>
	);
};

export default Root;
