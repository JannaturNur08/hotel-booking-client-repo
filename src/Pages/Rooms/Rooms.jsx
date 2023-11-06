import { useEffect, useState } from "react";

const Rooms = () => {
	const [room, setRoom] = useState([]);
	useEffect(() => {
		fetch("room.json")
			.then((res) => res.json())
			.then((data) => setRoom(data));
	}, []);
	
	
	return (
		<div>
			<h2>Room Page</h2>
		</div>
	);
};

export default Rooms;
