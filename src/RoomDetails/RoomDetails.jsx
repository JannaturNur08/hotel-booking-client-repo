import { useLoaderData } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import useReviews from "../hooks/useReviews";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import Swal from "sweetalert2";
const RoomDetails = () => {
	// for getting user email
	const { user } = useAuth();
	console.log(user);
	const email = user.email;
	const userId = user.uid;
	console.log(email);
	const roomDetails = useLoaderData();
	const reviews = useReviews(roomDetails._id);
	console.log(roomDetails);
	const { _id, category_name, rooms, description } = roomDetails;
	const roomImages = roomDetails.rooms.room_images;
	const categoryId = roomDetails._id;
	const totalRooms = roomDetails.rooms.maxRooms;

	const [minCheckInDate, setMinCheckInDate] = useState("");
	const [minCheckOutDate, setMinCheckOutDate] = useState("");
	const [roomAvailability, setRoomAvailability] = useState({});
	const [roomCount, setRoomCount] = useState(0);
	const [bookingDate, setBookingDate] = useState("");

	useEffect(() => {
		const now = moment().format("YYYY-MM-DD");
		setMinCheckInDate(now);
		const initialRoomCount = roomAvailability[now] || totalRooms;
		setRoomCount(initialRoomCount);
		(async () => {
			await fetchBookingsData();
		})();
	}, []);

	const fetchBookingsData = async () => {
		try {
			const response = await fetch("http://localhost:3000/bookings");
			const bookings = await response.json();
			calculateRoomAvailability(bookings);
		} catch (error) {
			console.error("Error fetching bookings:", error);
		}
	};

	const calculateRoomAvailability = (bookings) => {
		//  available rooms by date
		const availability = {};

		//  default room count
		for (const booking of bookings) {
			const bookingDate = moment(booking.bookingDate).format(
				"YYYY-MM-DD"
			);
			const checkoutDate = moment(bookingDate)
				.add(1, "days")
				.format("YYYY-MM-DD");

			// Decrement the available room count for the booking date
			availability[bookingDate] =
				(availability[bookingDate] || totalRooms) - booking.roomCount;
			// Increment the available room count for the day after checkout
			availability[checkoutDate] =
				(availability[checkoutDate] || totalRooms) +
				parseInt(booking.roomCount);
		}

		// Ensure availability does not exceed totalRooms or go below 0
		Object.keys(availability).forEach((date) => {
			availability[date] = Math.min(
				Math.max(availability[date], 0),
				totalRooms
			);
		});

		setRoomAvailability(availability);
	};

	const handleCheckInDateChange = async (e) => {
		const selectedDate = e.target.value;
		const CheckOutDate = moment(selectedDate)
			.add(1, "days")
			.format("YYYY-MM-DD");
		setMinCheckOutDate(CheckOutDate);

		// Update available room count
		const availableRoomsThatDay =
			roomAvailability[selectedDate] || totalRooms;
		setRoomCount(availableRoomsThatDay);
	};

	const handleBookingConfirm = async (e) => {
		e.preventDefault();
		const form = e.target;
		const selectedBookingDate = form.Check_in_Date.value;
		const selectedRoomCount = parseInt(form.userRoomCount.value, 10);
		const price = rooms.price;
		const newBooking = {
			userId,
			categoryId,
			bookingDate: selectedBookingDate,
			roomCount: selectedRoomCount,
			price,
		};

		try {
			const response = await fetch("http://localhost:3000/bookings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newBooking),
			});

			const data = await response.json();
			if (data.insertedId) {
				Swal.fire({
					title: "Success!",
					text: "Room Booked Successfully",
					icon: "success",
					confirmButtonText: "Confirmed",
				});
				const remaining = totalRooms - roomCount;
				setRoomCount(remaining);
				form.reset();
				setBookingDate(bookingDate);
				updateRoomAvailabilityAfterBooking(
					selectedBookingDate,
					selectedRoomCount
				);
			}
		} catch (error) {
			console.error("Error:", error);
			Swal.fire({
				title: "Error!",
				text: "An error occurred while booking the room.",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	};

	const updateRoomAvailabilityAfterBooking = (bookingDate, roomCount) => {
		const newRoomAvailability = { ...roomAvailability };
		const formattedDate = moment(bookingDate).format("YYYY-MM-DD");
		const checkoutDate = moment(formattedDate)
			.add(1, "days")
			.format("YYYY-MM-DD");

		// Decrement available rooms for the booking date
		newRoomAvailability[formattedDate] =
			(newRoomAvailability[formattedDate] || totalRooms) - roomCount;
		// Increment available rooms for the day after checkout
		newRoomAvailability[checkoutDate] =
			(newRoomAvailability[checkoutDate] || totalRooms) +
			parseInt(roomCount);

		return newRoomAvailability;
	};

	return (
		<div>
			<div className="grid grid-cols-4 px-12  gap-2">
				<div className="col-span-2 row-span-2">
					<img src={roomImages[0]} alt="" />
				</div>
				<div>
					<img src={roomImages[1]} alt="" />
				</div>
				<div>
					<img src={roomImages[2]} alt="" />
				</div>
				<div>
					<img src={roomImages[3]} alt="" />
				</div>
				<div>
					<img src={roomImages[4]} alt="" />
				</div>
			</div>

			<div>
				<div className="lg:w-3/4 mx-auto mt-5 grid grid-cols-2 pt-10">
					<div className="space-y-5">
						<h2 className="font-mercellus text-4xl">
							{category_name}
						</h2>
						<div className="flex flex-row gap-3">
							<p>{rooms.room_size}</p>
							<p>{rooms.guest} Guests </p>
							<p>{rooms.bed} Beds </p>
							<p> {rooms.bath} Baths </p>
						</div>
						<div className="space-y-4">
							<p className="font-jost text-xl">{description}</p>
							<p className="font-mercellus text-3xl mt-5">
								Family-friendly Amenities
							</p>
							<div className="flex flex-row gap-3">
								<p>Kids Swimming Pool</p>
								<p>Extra Beds/Baby Crib</p>
								<p>Washing Machine</p>
							</div>
						</div>
						<h2 className="font-mercellus text-3xl">Reviews</h2>
						<div className="grid grid-cols-2 mt-10 gap-3">
							{reviews.map((review, idx) => (
								<div key={idx}>
									<div className="flex flex-row gap-5">
										<p className="font-mercellus text-xl font-medium">
											{review.userName}
										</p>
										<div className="flex flex-row gap-2">
											<p className="text-2xl">
												({review.rating})
											</p>
											<div className="pt-1">
												<Rating
													style={{ maxWidth: 100 }}
													readOnly
													orientation="horizontal"
													value={review.rating}
												/>
											</div>
										</div>
									</div>

									<p>{review.comment}</p>
								</div>
							))}
						</div>
					</div>
					<div>
						<div className="text-center mt-4"></div>
						<form id="bookingForm" onSubmit={handleBookingConfirm}>
							{/* form row */}
							<div className="mb-8 mt-5">
								<div className=" mb-8">
									<div className="form-control md:w-1/2 mx-auto mb-2">
										<label className="label">
											<span className="label-text ">
												Category
											</span>
										</label>
										<label className="input-group">
											<input
												type="text"
												name="name"
												disabled
												defaultValue={category_name}
												className="input input-bordered w-full"
											/>
										</label>
									</div>
								</div>
								<div className="form-control md:w-1/2 mx-auto mb-2">
									<label className="label">
										<span className="label-text ">
											Check In
										</span>
									</label>
									<label className="input-group">
										<input
											type="date"
											name="Check_in_Date"
											placeholder="Check in Date"
											className="input input-bordered w-full"
											min={minCheckInDate}
											onChange={handleCheckInDateChange}
											required
										/>
									</label>
								</div>
								<div className="form-control md:w-1/2 mx-auto mb-2">
									<label className="label">
										<span className="label-text ">
											Check Out
										</span>
									</label>
									<label className="input-group">
										<input
											type="date"
											name="Check_out_Date"
											placeholder="Check Out Date"
											className="input input-bordered w-full"
											readOnly
											defaultValue={minCheckOutDate}
										/>
									</label>
								</div>

								<div className="form-control md:w-1/2 mx-auto mb-2">
									<label className="label">
										<span className="label-text ">
											Rooms
										</span>
									</label>
									<label className="input-group border-0">
										<input
											type="text"
											name="userRoomCount"
											placeholder={`Available Rooms ${roomCount}`}
											required
											className="input input-bordered w-full"
										/>
									</label>
								</div>

								{/* form category row */}
								<div className=" mb-8">
									<div className="form-control md:w-1/2 mx-auto mb-2">
										<label className="label">
											<span className="label-text ">
												Total Cost
											</span>
										</label>
										<label className="input-group">
											<input
												type="text"
												name="price"
												disabled
												defaultValue={rooms.price}
												className="input input-bordered w-full"
											/>
										</label>
									</div>
								</div>

								<div className="text-center">
									<button
										// onClick={openModal}
										onClick={() =>
											document
												.getElementById("my_modal_1")
												.showModal()
										}
										className="btn bg-[#20292e] text-[#c5c4c4]  md:w-1/2 text-center border-0">
										Book Now
									</button>
									{roomCount == 0 && (
										<p className="text-red-400 font-medium pl-2">
											{" "}
											No Available Room
										</p>
									)}

									<dialog id="my_modal_1" className="modal">
										<div className="modal-box">
											<p className="py-4">{userId}</p>
											<p className="py-4">{categoryId}</p>
											<p className="py-4">
												Booking Date : {bookingDate}
											</p>
											<p className="py-4">
												Total Room Booked
												{roomCount}
											</p>

											<p className="py-4">Price :</p>
											<div className="modal-action">
												<form method="dialog">
													{/* if there is a button in form, it will confirm the modal */}
													<button
														className="btn"
														type="submit">
														Confirm
													</button>
												</form>
											</div>
										</div>
									</dialog>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default RoomDetails;
