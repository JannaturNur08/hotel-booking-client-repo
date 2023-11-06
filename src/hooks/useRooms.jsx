import  { useEffect, useState } from 'react';

const useRooms = () => {
    const [rooms, setRooms] = useState([]);

	useEffect(() => {
        fetch('http://localhost:3000/room')
        .then(res => res.json())
        .then(data => setRooms(data));
    }, []);
    return rooms;
};

export default useRooms;