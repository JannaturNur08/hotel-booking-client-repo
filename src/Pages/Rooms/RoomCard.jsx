

const RoomCard = ({room}) => {
    const {category_name,rooms,room_size,price,reviews,room_images} = room;

    return (
        <div>
            <img src={rooms.room_images[0]} alt="" />
            <h2>{category_name}</h2>
            <p>Available Rooms:  {rooms.room_number}</p>
            <p>Room Size :{rooms.room_size}</p>
            <p>Price : $ {rooms.price}</p>
            
            <p>Review : {reviews.length}</p>
        </div>
    );
};

export default RoomCard;