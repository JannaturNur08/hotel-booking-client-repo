import { useLoaderData } from "react-router-dom";


const RoomDetails = () => {
    const roomDetails = useLoaderData();
    console.log(roomDetails);
    return (
        <div>
            <h2>Room details page</h2>
        </div>
    );
};

export default RoomDetails;