import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
	const {_id, category_name, rooms, room_size, price, reviews, room_images } =
		room;

	// average rating from reviews
	const totalReviewRating = reviews.reduce(
		(total, review) => total + review.rating,
		0
	);
	const avgRating = totalReviewRating / reviews.length;
	console.log(avgRating);
	const stars = Array(5).fill(null);

	return (
		<div>
        <Link to={`/${_id}`}>
        <div className="space-y-2">
			<img src={rooms.room_images[0]} alt="" />
			<div className="flex flex-row justify-between">
				<h2 className="font-mercellus text-2xl">{category_name}</h2>

				<div className="flex flex-row gap-2">
					<p className="text-2xl">{avgRating} </p>
					<div className="pt-1">
						{" "}
						(
						{stars.map((_, index) => (
							<span
								key={index}
								className={` border-0 ${
									index + 0.5 <= avgRating
										? "mask mask-half-1"
										: "mask-hidden"
								}`}>
								{index + 1 <= avgRating ? "⭐" : "✩"}
							</span>
						))}{" "}
						)
					</div>
				</div>
			</div>
			<p>Available Rooms: {rooms.room_number}</p>
			<div className="flex flex-row gap-3">
				<p>{rooms.room_size}</p>
				<p>{rooms.guest} Guests </p>
				<p>{rooms.bed} Beds </p>
				<p> {rooms.bath} Baths </p>
			</div>
			<p>Price : $ {rooms.price}</p>
		</div></Link>
        </div>
	);
};

export default RoomCard;
