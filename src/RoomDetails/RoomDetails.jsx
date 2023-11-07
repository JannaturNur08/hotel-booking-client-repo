import { useLoaderData } from "react-router-dom";

import { useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import moment from "moment";

const RoomDetails = () => {
	const { user } = useAuth();
	const email = user.email;

	const roomDetails = useLoaderData();
	console.log(roomDetails);
	//const[newRoomNumber,setNewRoomNumber] = useState(room);
	let room = roomDetails.rooms.room_number;
	let price = roomDetails.rooms.price;

	console.log(room);

	const [roomCount, setRoomCount] = useState(room);
	//const [showModal, setShowModal] = useState(false);
	const [checkInDate, setCheckInDate] = useState("");
	const [checkOutDate, setCheckOutDate] = useState("");
	//const [numOfRoom, setNumOfRooms] = useState(room);
	const [priceof, setPriceOf] = useState(price);
	console.log(roomCount);
	const checkInMoment = moment(checkInDate);
	const checkOutMoment = moment(checkOutDate);
	const duration = moment.duration(checkOutMoment.diff(checkInMoment));
	const nights = duration.asDays();
	console.log(nights);

	console.log(roomDetails.rooms.room_images);
	const roomImages = roomDetails.rooms.room_images;

	const handleCheckInDateChange = (e) => {
		const selectedDate = e.target.value;

		if (moment(selectedDate).isValid()) {
			setCheckInDate(selectedDate);

			const minCheckOutDate = moment(selectedDate)
				.add(1, "days")
				.format("YYYY-MM-DD");

			if (moment(checkOutDate).isBefore(minCheckOutDate)) {
				setCheckOutDate(minCheckOutDate);
			}
		}
	};
	const handleCheckOutDateChange = (e) => {
		const selectedDate = e.target.value;

		if (moment(selectedDate).isValid()) {
			setCheckOutDate(selectedDate);

			const minCheckOutDate = moment(checkInDate)
				.add(1, "days")
				.format("YYYY-MM-DD");

			if (moment(selectedDate).isBefore(minCheckOutDate)) {
				setCheckOutDate(minCheckOutDate);
			}
		}
	};

	const handleConfirmBooking = (e) => {
		e.preventDefault();
		// Handle the booking information here (e.g., send it to the server).
		console.log("Check-in Date:", checkInDate);
		console.log("Check-out Date:", checkOutDate);

		// Retrieve the booking information

		const roomNumber = roomCount;

		// Check if there are available rooms
		if (roomNumber > 0) {
			//const today = moment().calendar();
			//const name = user.name; // Replace this with the actual name source
			const form = e.target;
			//const today = moment().calendar();
			const checkIn = form.Check_in_Date.value;
			const checkOut = form.check_out_date.value;
			const rooms = form.rooms.value;
			const name = form.name.value;
			const price = form.price.value;

			const newBooking = {
				email,

				name,
				checkIn,
				checkOut,
				rooms,
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
				.then((res) => res.json())
				.then((data) => {
					if (data.insertedId) {
						// Decrease the available room count and reset the form
						const roomDecre = roomCount - roomNumber;
						setRoomCount(roomDecre);
						setCheckInDate(checkIn);
						setCheckOutDate(checkOut);
						setPriceOf(price);
					} else {
						// Failed to add to bookings
						Swal.fire({
							title: "Error!",
							text: "Failed To Add In The Bookings",
						});
					}
				});
		} else {
			// No available rooms
			Swal.fire({
				title: "Oops...",
				text: "No available Rooms!",
			});
		}
	};
	const handleConfirmButtonClick = () => {
		// Manually submit the form
		const form = document.getElementById("bookingForm");
		form.submit();
		// Successfully added to bookings
		Swal.fire({
			title: "Success!",
			text: "Successfully Added in the Bookings",
			icon: "success",
			confirmButtonText: "Confirmed",
		});
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
											value={checkInDate}
											onChange={handleCheckInDateChange}
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
											name="check_out_date"
											placeholder="Check out Date"
											className="input input-bordered w-full"
											value={checkOutDate}
											onChange={handleCheckOutDateChange}
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
											name="rooms"
											placeholder={`Available room ${roomCount}`}
											className="input input-bordered w-full"
										/>
										{roomCount == 0 && (
											<p className="text-red-400 font-medium pl-2">
												{" "}
												No Available Room
											</p>
										)}
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
										disabled={roomCount <= 0}
										// onClick={openModal}
										onClick={() =>
											document
												.getElementById("my_modal_1")
												.showModal()
										}
										className="btn bg-[#20292e] text-[#c5c4c4]  md:w-1/2 text-center border-0">
										Book Now
									</button>
									<dialog id="my_modal_1" className="modal">
										<div className="modal-box">
											<h3 className="font-bold text-lg">
												Name :
												{roomDetails.category_name}
											</h3>
											<p className="py-4">
												Check-In-Date : {checkInDate}
											</p>
											<p className="py-4">
												Check-Out-Date: {checkOutDate}
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
