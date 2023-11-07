import { useEffect } from "react";
import { useState } from "react";


const useBookings = () => {
    const [existingBookings, setExistingBookings] = useState([]);
    useEffect(() => {
        fetch('http://localhost:3000/bookings')
        .then(res => res.json())
        .then(data => setExistingBookings(data));
    }, []);
    return existingBookings;
};

export default useBookings;