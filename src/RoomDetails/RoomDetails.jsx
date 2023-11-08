import { useLoaderData } from "react-router-dom";

import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import moment from "moment";

const RoomDetails = () => {
	// for getting user email
	const { user } = useAuth();
	const email = user.email;
	const roomDetails = useLoaderData();
	const roomImages = roomDetails.rooms.room_images;
	let room = roomDetails.rooms.room_number;
	const category_name = roomDetails.category_name;
	//console.log(category_name);

	const [isRoomAvailable, setIsRoomAvailable] = useState(true);
	const [availabilityError, setAvailabilityError] = useState("");
	const [roomCount, setRoomCount] = useState(room);
	console.log(roomCount);
	const [userRoomCount, setUserRoomCount] = useState(0);
	console.log(userRoomCount);
	const [minCheckInDate, setMinCheckInDate] = useState("");
	const [minCheckOutDate, setMinCheckOutDate] = useState("");
	const [priceof, setPriceOf] = useState(roomDetails.rooms.price);
	const [existingBookings, setExistingBookings] = useState([]);

	useEffect(() => {
		const now = moment().format("YYYY-MM-DD");
		setMinCheckInDate(now);
	}, []);

	useEffect(() => {
		fetch(`http://localhost:3000/booking/${category_name}`)
			.then((res) => res.json())
			.then((data) => setExistingBookings(data));
	}, [category_name]);

	const handleCheckInDateChange = (e) => {
		const selectedDate = e.target.value;
		const CheckOutDate = moment(selectedDate)
			.add(1, "days")
			.format("YYYY-MM-DD");
		setMinCheckOutDate(CheckOutDate);
		const selectedCheckIn = moment(selectedDate);
		const selectedCheckOut = moment(CheckOutDate);
		const isAvailable = existingBookings.every((booking) => {
			const bookingCheckIn = moment(booking.checkIn);
			const bookingCheckOut = moment(booking.checkOut);
			return (
				selectedCheckIn.isAfter(bookingCheckOut) ||
				selectedCheckOut.isBefore(bookingCheckIn)
			);
		});
		if (roomCount > 0) {
			setIsRoomAvailable(isAvailable);
		} else {
			if (!isAvailable) {
				setAvailabilityError(
					"No available rooms for the selected date range."
				);
			} else {
				setAvailabilityError("");
			}
		}
	};

	// booking posting to server
	const handleConfirmBooking = (e) => {
		// Handle the booking information here (e.g., send it to the server).
		console.log("Check-in Date:", minCheckInDate);
		console.log("Check-out Date:", minCheckOutDate);

		// Retrieve the booking information

		//const roomNumber = roomCount;

		// Check if there are available rooms
		try {
			e.preventDefault();
			//const today = moment().calendar();
			//const name = user.name; // Replace this with the actual name source
			const form = e.target;
			//const today = moment().calendar();
			const checkIn = form.Check_in_Date.value;
			const checkOut = form.Check_out_Date.value;
			const room_number = parseInt(form.userRoom.value, 10);
			console.log(room_number);
			const category_name = form.name.value;
			const price = form.price.value;
			setUserRoomCount(room_number);
			const newBooking = {
				email,

				category_name,
				checkIn,
				checkOut,
				room_number,
				price,
			};

			// Send data to the server
			fetch("http://localhost:3000/bookings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newBooking),
			})
				.then((res) => {
					if (!res.ok) throw new Error("Server response not OK");
					return res.json();
				})
				.then((data) => {
					if (data.success) {
						// Decrease the available room count and reset the form

						setMinCheckInDate(checkIn);
						setMinCheckOutDate(checkOut);
						setPriceOf(price);
						setRoomCount(
							(previousCount) => previousCount - room_number
						);
						//  form.current.reset();
						// Successfully added to bookings
						Swal.fire({
							title: "Success!",
							text: "Successfully Added in the Bookings",
							icon: "success",
							confirmButtonText: "Confirmed",
						});
					} else {
						// Failed to add to bookings
						throw new Error("Booking failed");
					}
				});
		} catch (error) {
			console.error("There was an error!", error);
			Swal.fire({
				title: "Error!",
				text: "Failed To Add In The Bookings",
				icon: "error",
			});
		}
	};
	// confirming with modal
	const handleConfirmButtonClick = () => {
		// Manually submit the form
		const form = document.getElementById("bookingForm");
		form.submit();
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
							{roomDetails.category_name}
						</h2>
						<div className="flex flex-row gap-3">
							<p>{roomDetails.rooms.room_size}</p>
							<p>{roomDetails.rooms.guest} Guests </p>
							<p>{roomDetails.rooms.bed} Beds </p>
							<p> {roomDetails.rooms.bath} Baths </p>
						</div>
						<div className="space-y-4">
							<p className="font-jost text-xl">
								{roomDetails.description}
							</p>
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
						<div className="grid grid-cols-2 mt-10">
							{roomDetails?.reviews.map((review, idx) => (
								<div key={idx}>
									<p className="font-mercellus text-xl font-medium">
										{review.customer_name}
									</p>
									<p>{review.review_text}</p>
									<p>{review.rating}</p>
								</div>
							))}
						</div>
					</div>
					<div>
						<form onSubmit={handleConfirmBooking} id="bookingForm">
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
												defaultValue={
													roomDetails.category_name
												}
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
											name="userRoom"
											placeholder={`Available Rooms ${roomCount}`}
											required
											className="input input-bordered w-full"
										/>
										{/* {!isRoomAvailable && (
											<p className="text-red-400 font-medium pl-2">
												{" "}
												No Available Room
											</p>
										)} */}
									</label>
								</div>
								<div className="form-control md:w-1/2 mx-auto mb-2">
									<label className="label">
										<span className="label-text ">
											Adults
										</span>
									</label>
									<label className="input-group border-0">
										<input
											type="text"
											name="adults"
											placeholder="Adults"
											className="input input-bordered w-full"
										/>
									</label>
								</div>
								<div className="form-control md:w-1/2 mx-auto mb-2">
									<label className="label">
										<span className="label-text ">
											Children
										</span>
									</label>
									<label className="input-group border-0">
										<input
											type="text"
											name="children"
											placeholder="Children"
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
												defaultValue={
													roomDetails.rooms.price
												}
												className="input input-bordered w-full"
											/>
										</label>
									</div>
								</div>

								<div className="text-center">
									<button
										disabled={
											roomCount == 0 
										}
										// onClick={openModal}
										onClick={() =>
											document
												.getElementById("my_modal_1")
												.showModal()
										}
										className="btn bg-[#20292e] text-[#c5c4c4]  md:w-1/2 text-center border-0">
										Book Now
									</button>
									{roomCount==0 && (
										<p className="text-red-400 font-medium pl-2">
											No avilable Rooms 
										</p>
									)}
									<dialog id="my_modal_1" className="modal">
										<div className="modal-box">
											<h3 className="font-bold text-lg">
												Name :
												{roomDetails.category_name}
											</h3>
											<p className="py-4">
												Check-In-Date : {minCheckInDate}
											</p>
											<p className="py-4">
												Check-Out-Date:{" "}
												{minCheckOutDate}
											</p>

											<p className="py-4">
												Price : {priceof}
											</p>
											<div className="modal-action">
												<form method="dialog">
													{/* if there is a button in form, it will confirm the modal */}
													<button
														className="btn"
														onClick={
															handleConfirmButtonClick
														}>
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
