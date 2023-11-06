
import { useState } from "react";
import useRooms from "../../hooks/useRooms";
import RoomCard from "./RoomCard";

const Rooms = () => {
	
    const rooms = useRooms();
    const [maxPrice, setMaxPrice] = useState(500);
    const filteredRoomsWithPrice = rooms.filter(room => room.rooms.price <= maxPrice);
const handleSliderChange = e => {
    const newMaxPrice = parseInt(e.target.value,10);
    console.log(newMaxPrice);
    setMaxPrice(newMaxPrice);
}
	
	
	
	return (
		<div>
			<h2>Room Page</h2>
            <input type="range" min={0} max={500}  value={maxPrice} onChange={handleSliderChange} className="range range-success w-1/2" />
            <div className="text-center">
           
			
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {
                    filteredRoomsWithPrice.map(room => <RoomCard room={room} key={room._id}></RoomCard>)
                }
            </div>
		</div>
	);
};

export default Rooms;
