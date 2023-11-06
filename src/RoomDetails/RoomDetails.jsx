import { useLoaderData } from "react-router-dom";


const RoomDetails = () => {
    const roomDetails = useLoaderData();
    console.log(roomDetails.rooms.room_images);
    const roomImages = roomDetails.rooms.room_images;
//     ● Room Description
// ● Price per Night
// ● Room Size
// ● Availability
// ● Room Images

    return (
        <div>
            
            <div className="grid grid-cols-4 px-12  gap-2"> 
            <div className="col-span-2 row-span-2">
                    <img src={roomImages[0]} alt="" />
                </div>
                <div >
                <img src={roomImages[1]} alt="" />
                </div>
                <div >
                <img src={roomImages[2]} alt="" />
                </div>
                <div >
                <img src={roomImages[3]} alt="" />
                </div>
                <div >
                <img src={roomImages[4]} alt="" />
                </div>
               
                {/* <div className="col-span-1">
                    { roomImages.slice(3, 5).map((image, idx) => (
                        <img src={image} key={idx} alt="" />
                    ))}
                </div> */}
            </div>
        </div>
    );
};

export default RoomDetails;