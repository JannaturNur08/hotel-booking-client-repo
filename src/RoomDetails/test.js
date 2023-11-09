import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Rating } from '@smastrom/react-rating';

const RoomDetails = ({ roomsData }) => {
  const { roomId } = useParams(); // Assuming you're using URL params to get the room ID
  const room = roomsData.find((r) => r._id === roomId);
  const [startDate, setStartDate] = useState(new Date());
  const [isBooked, setIsBooked] = useState(false);

  if (!room) {
    return <p>Room not found</p>;
  }

  const {
    category_name,
    room_size,
    price,
    room_images,
    availability,
    specialOffers,
  } = room;

  const handleBooking = () => {
    // Logic to book the room
    // Update the availability in your state or database
    setIsBooked(true);
  };

  return (
    <div>
      <div className="room-images">
        {room_images.map((image, index) => (
          <img key={index} src={image} alt={`Room view ${index + 1}`} />
        ))}
      </div>
      <h2>{category_name}</h2>
      <p>Size: {room_size}</p>
      <p>Price per Night: ${price}</p>
      <p>Availability: {availability ? 'Available' : 'Not Available'}</p>
      {specialOffers && <p>Special Offers: {specialOffers}</p>}
      <div className="ratings">
        <Rating
          style={{ maxWidth: 100 }}
          readOnly
          orientation="horizontal"
          // Assume you have a function to calculate average rating
          value={calculateAverageRating(room._id)}
        />
      </div>
      <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
      <button onClick={handleBooking} disabled={!availability || isBooked}>
        Book Now
      </button>
      {isBooked && <p>Thank you for your booking!</p>}
      {/* Add your logic to display reviews or a message if there are no reviews */}
      <div className="reviews">
        {/* Display reviews or a message if there are no reviews */}
      </div>
      {/* Link to go back to the list of rooms */}
      <Link to="/rooms">Back to rooms</Link>
    </div>
  );
};

export default RoomDetails;




