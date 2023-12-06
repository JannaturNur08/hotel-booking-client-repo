import { useEffect, useState } from "react";

const useReviews = (categoryId) => {
	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		fetch("https://b8a11-server-side-jannatur-nur08.vercel.app/api/reviews")
			.then((res) => res.json())
			.then((data) => {
				// Filter reviews by categoryId
				const filteredReviews = data.filter(
					(review) => review.categoryId === categoryId
				);
				setReviews(filteredReviews);
			});
	}, [categoryId]);
	console.log(reviews);

	return reviews;
};

export default useReviews;
