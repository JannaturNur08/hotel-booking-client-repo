import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";
import Rooms from "../Pages/Rooms/Rooms";
import MyBookings from "../Pages/MyBookings/MyBookings";


const router = createBrowserRouter([
    {
        path: "/",
        element : <Root></Root>,
        errorElement : <ErrorPage></ErrorPage>,
        children : [
            {
                path : '/',
                element: <Home></Home>
            },
            {
                path : '/rooms',
                element: <Rooms></Rooms>
            },
            {
                path : '/myBookings',
                element: <MyBookings></MyBookings>
            }
        ]
    }

]);

export default router;