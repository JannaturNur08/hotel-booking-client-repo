import { useState } from "react";
import useRooms from "../../hooks/useRooms";
import RoomCard from "./RoomCard";

const Rooms = () => {
	let rooms = useRooms();
	//const {rooms} = lodedRooms;
	console.log(rooms);
	const [maxPrice, setMaxPrice] = useState(500);
	const filteredRoomsWithPrice = rooms.filter(
		(room) => room.rooms.price <= maxPrice
	);
	//rooms by price in ascending order
	const sortedRooms = filteredRoomsWithPrice.sort(
		(a, b) => a.rooms.price - b.rooms.price
	);

	const handleSliderChange = (e) => {
		const newMaxPrice = parseInt(e.target.value, 10);
		console.log(newMaxPrice);
		setMaxPrice(newMaxPrice);
	};

	return (
		<div >
			<div >
				<div className="carousel-item relative w-full">
					<img
						src="https://i.ibb.co/smSHP7g/Account-header.jpg"
						className="w-full"
					/>
					<div className="absolute  rounded-xl  h-full">
						<div className="text-white text-center ">
							<p className="text-sm font-jost text-sm">
								CHECK OUR ACCOMODATIONS{" "}
							</p>
							<h2 className="text-6xl font-bold font-mercellus">
								Rooms, Suites & Chalets
							</h2>
						</div>
					</div>
				</div>
			</div>

			<div className="lg:w-3/4 mx-auto mt-10 ">
				<p className="font-mercellus text-2xl">Price</p>
				<input
					type="range"
					min={0}
					max={500}
					value={maxPrice}
					onChange={handleSliderChange}
					className="range range-warning w-4/12 mt-2"
				/>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-7 mt-5 ">
					{sortedRooms.map((room) => (
						<RoomCard room={room} key={room._id}></RoomCard>
					))}
				</div>
			</div>
		</div>
	);
};

export default Rooms;
