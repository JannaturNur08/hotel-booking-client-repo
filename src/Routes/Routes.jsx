import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Rooms from "../Pages/Rooms/Rooms";
import MyBookings from "../Pages/MyBookings/MyBookings";
import Login from "../Pages/Login/Login";
import SignUp from "../Pages/SignUp/SignUp";
import PrivateRoutes from "./PrivateRoutes";
import RoomDetails from "../RoomDetails/RoomDetails";


const router = createBrowserRouter([
	{
		path: "/",
		element: <Root></Root>,
		errorElement: <ErrorPage></ErrorPage>,
		children: [
			{
				path: "/",
				element: <Home></Home>,
			},
			{
				path: "/rooms",
				element: <Rooms></Rooms>,
			},
			{
				path: "/myBookings",
				element: (
					<PrivateRoutes>
						<MyBookings></MyBookings>
					</PrivateRoutes>
				),
			},
			{
				path: "/login",
				element: <Login></Login>,
			},
			{
				path: "/signup",
				element: <SignUp></SignUp>,
			},

			{
				path: "/:id",
				element: (
					<PrivateRoutes>
						<RoomDetails></RoomDetails>
					</PrivateRoutes>
				),
				loader: ({ params }) =>
					fetch(`http://localhost:3000/room/${params.id}`),
			},
		],
	},
]);

export default router;
