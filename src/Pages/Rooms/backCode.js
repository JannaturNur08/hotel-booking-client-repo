import { useEffect, useState } from "react";

const Rooms = () => {
	const [room, setRoom] = useState([]);
	const [customerName, setCustomerName] = useState("");
	const [reviewText, setReviewText] = useState("");
	const [rating, setRating] = useState(5); // Default rating
	const [newReview, setNewReview] = useState({
		customer_name: "",
		review_text: "",
		rating: 5, // You can set a default rating
	});
	const [count, setReviewCount] = useState(0);
	// Access the first room in the array, for example
	let specificRoomId = 1;
	let specificRoom = room.find((room) => room.room_id === specificRoomId);
	if (specificRoom) {
		const reviewCount = specificRoom.reviews.length;
		setReviewCount(reviewCount);
		console.log(reviewCount);
	}

	// const totalReviews = room.reduce((total, room) => total + room.reviews.length, 0);

	// console.log(`Total Reviews Length: ${totalReviews}`);

	//const review = room[0].reviews;
	console.log(room);

	useEffect(() => {
		fetch("room.json")
			.then((res) => res.json())
			.then((data) => setRoom(data));
	}, []);

	const handleReviewSubmit = (specificRoomId) => {
		// Create a copy of the room object to avoid mutating the state directly
		const updatedRoom = { ...room };
		const newReview = {
			customer_name: customerName,
			review_text: reviewText,
			rating: rating,
		};

		updatedRoom.reviews = [...updatedRoom.reviews, newReview];
		// Update the room state with the new review
		// You can use your state management approach (e.g., useState, Redux, etc.)
		// For simplicity, here, we're using local state and setRoom function.
		setRoom(updatedRoom);
		if (specificRoom) {
			// Add the new review to the reviews array of the specific room
			specificRoom.reviews.push(newReview);
			// Update the review_count based on the length of the reviews array
			// specificRoom.review_count = specificRoom.reviews.length;
			console.log("New review added successfully.");
		} else {
			console.log(`Room with room_id ${specificRoomId} not found.`);
		}

		// // Clear the new review form
		// setNewReview({
		//   customer_name: '',
		//   review_text: '',
		//   rating: 5,
		// });
		/// Reset the form
		setCustomerName("");
		setReviewText("");
		setRating(5); // Reset rating to default
	};
	return (
		<div>
			<h2>Room Page</h2>
			<p>Room : {room.length}</p>
			{/* <p>Review : {room[0].reviews.length}</p> */}
			<p>{count}</p>

			<form>
				<input
					type="text"
					placeholder="Your Name"
					value={newReview.customer_name}
					onChange={(e) =>
						setNewReview({
							...newReview,
							customer_name: e.target.value,
						})
					}
				/>
				<textarea
					placeholder="Write your review"
					value={newReview.review_text}
					onChange={(e) =>
						setNewReview({
							...newReview,
							review_text: e.target.value,
						})
					}
				/>
				<select
					value={newReview.rating}
					onChange={(e) =>
						setNewReview({ ...newReview, rating: e.target.value })
					}>
					<option value="5">5 (Excellent)</option>
					<option value="4">4 (Good)</option>
					<option value="3">3 (Average)</option>
					<option value="2">2 (Below Average)</option>
					<option value="1">1 (Poor)</option>
				</select>
				<button type="button" onClick={handleReviewSubmit}>
					Submit Review
				</button>
			</form>
		</div>
	);
};

export default Rooms;
