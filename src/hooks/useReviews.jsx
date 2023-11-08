import  { useEffect, useState } from 'react';

const useReviews = (categoryId) => {
    const [reviews, setReviews] = useState([]);
    useEffect(() => {
		fetch(`http://localhost:3000/api/reviews?categoryId=${categoryId}`)
			.then((res) => res.json())
			.then((data) => setReviews(data))
            .catch((error) => console.error('Error fetching reviews:', error));
	}, [categoryId]);
    console.log(reviews);

    return reviews;
};

export default useReviews;