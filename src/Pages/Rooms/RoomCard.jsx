import { Link } from "react-router-dom";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import useReviews from "../../hooks/useReviews";


const RoomCard = ({ room }) => {
	const reviews = useReviews(room._id);

	const {
		_id,
		category_name,
		rooms,
		room_size,
		price,

		room_images,
	} = room;

	const categoryId = room._id;

	

	console.log(categoryId);
	console.log(reviews);

	
	// average rating from reviews
	const totalReviewRating = reviews.reduce(
		(total, review) => total + review.rating,
		0
	);
	const avgRating =
		reviews.length > 0 ? totalReviewRating / reviews.length : 0;
	console.log(avgRating);
	//	const stars = Array(5).fill(null);

	return (
		<div>
			<Link to={`/${_id}`}>
				<div className="space-y-2">
					<img src={rooms.room_images[0]} alt="" />
					<div className="flex flex-row justify-between">
						<h2 className="font-mercellus text-2xl">
							{category_name}
						</h2>

						<div className="flex flex-row gap-2">
							<p className="text-2xl">({avgRating})</p>
							<div className="pt-1">
								<Rating
									style={{ maxWidth: 100 }}
									readOnly
									orientation="horizontal"
									value={avgRating}
								/>
							</div>
						</div>
					</div>
					{/* <p>Available Rooms: {rooms.room_number}</p> */}
					<div className="flex flex-row gap-3">
						<p>{rooms.room_size}</p>
						<p>{rooms.guest} Guests </p>
						<p>{rooms.bed} Beds </p>
						<p> {rooms.bath} Baths </p>
					</div>
					<p>Price : ${rooms.price}</p>
				</div>
			</Link>
		</div>
	);
};

export default RoomCard;
