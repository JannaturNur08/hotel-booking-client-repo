

const RoomCard = ({room}) => {
    const {category_name,rooms,room_size,price,reviews,room_images} = room;

    return (
        <div className="space-y-2">
            <img src={rooms.room_images[0]} alt="" />
            <h2 className="font-mercellus text-2xl">{category_name}</h2>
            <p>Available Rooms:  {rooms.room_number}</p>
            <div className="flex flex-row gap-3">
                <p>{rooms.room_size}</p>
                <p>{rooms.guest} Guests </p>
                <p>{rooms.bed} Beds </p>
             <p>   {rooms.bath} Baths </p>
            </div>
            <p>Price : $ {rooms.price}</p>
            
            <p>Review : {reviews.length}</p>
        </div>
    );
};

export default RoomCard;