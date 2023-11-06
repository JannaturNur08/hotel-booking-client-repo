
import useRooms from "../../hooks/useRooms";
import RoomCard from "./RoomCard";

const Rooms = () => {
	
    const rooms = useRooms();
	
	
	
	return (
		<div>
			<h2>Room Page</h2>
            <div className="text-center">
           
			
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {
                    rooms.map(room => <RoomCard room={room} key={room._id}></RoomCard>)
                }
            </div>
		</div>
	);
};

export default Rooms;
