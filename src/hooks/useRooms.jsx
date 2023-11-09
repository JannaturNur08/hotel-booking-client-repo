import { useEffect, useState } from "react";

const useRooms = () => {
	const [rooms, setRooms] = useState([]);

	useEffect(() => {
		fetch(
			"https://b8a11-server-side-jannatur-nur08-a1qwblfmw.vercel.app/room"
		)
			.then((res) => res.json())
			.then((data) => setRooms(data));
	}, []);
	return rooms;
};

export default useRooms;
