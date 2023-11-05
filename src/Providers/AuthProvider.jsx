import {
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	getAuth,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const googleProvider = new GoogleAuthProvider();
	const [loading, setLoading] = useState(true);

	const createUser = (email, password) => {
		setLoading(true);
		return createUserWithEmailAndPassword(auth, email, password);
	};
	const signIn = (email, password) => {
		setLoading(true);
		return signInWithEmailAndPassword(auth, email, password);
	};

	const googleSignIn = () => {
		setLoading(true);
		return signInWithPopup(auth, googleProvider);
	};

	const logOut = () => {
		setLoading(true);
		return signOut(auth);
	};

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			//const userEmail = currentUser?.email || user?.email;
			//const loggedUser = { email: userEmail };
			setUser(currentUser);
			console.log("current user in auth Provider", currentUser);
			setLoading(false);
			//     if (currentUser) {
			// 		axios
			// 			.post(
			// 				"https://car-doctor-server-three-silk.vercel.app/jwt",
			// 				loggedUser,
			// 				{ withCredentials: true }
			// 			)
			// 			.then((res) => {
			// 				console.log("token response", res.data);
			// 			});
			// 	} else {
			// 		axios
			// 			.post(
			// 				"https://car-doctor-server-three-silk.vercel.app/logout",
			// 				loggedUser,
			// 				{ withCredentials: true }
			// 			)
			// 			.then((res) => {
			// 				console.log(res.data);
			// 			});
			// 	}
		});
		return () => {
			return unsubscribe();
		};
	}, [user?.email]);
	const authInfo = {
		user,
		createUser,
		loading,
		signIn,
		googleSignIn,
		logOut,
	};

	return (
		<AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
	);
};

export default AuthProvider;
