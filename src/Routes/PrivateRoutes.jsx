
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const PrivateRoutes = ({children}) => {
    const { user, loading } = useAuth();
	if (user) {
		return children;
	}

	if (loading) {
		return <span className="loading loading-infinity loading-md"></span>;
	}

	return <Navigate to="/login"></Navigate>;
};

export default PrivateRoutes;