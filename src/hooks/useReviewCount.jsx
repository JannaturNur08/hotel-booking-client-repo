import { useState } from "react";
import useRooms from "./useRooms";


const useReviewCount = () => {
    const [reviewCount, setReviewCount] = useState(0);
    const rooms = useRooms();
    console.log(rooms);
   
    return reviewCount;
};

export default useReviewCount;