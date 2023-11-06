import { useLoaderData } from "react-router-dom";

import { useRef, useState } from "react";
import useAuth from "../hooks/useAuth";
import Swal from "sweetalert2";
import moment from "moment";

const RoomDetails = () => {
	const { user } = useAuth();
	const email = user.email;
	const roomDetails = useLoaderData();
	let room = roomDetails.rooms.room_number;
	console.log(room);
	const [roomCount, setRoomCount] = useState(room);
	//const formRef = useRef(null); // Create a ref for the form

	console.log(roomDetails.rooms.room_images);
	const roomImages = roomDetails.rooms.room_images;

	const handleBookNow = (e) => {
		if (roomCount > 0) {
			e.preventDefault();

			const form = e.target;
			const today = moment().calendar();
			const checkIn = form.Check_in_Date.value;
			const checkOut = form.check_out_date.value;
			const rooms = form.rooms.value;

			const name = form.name.value;

			const price = form.price.value;

			const newBooking = {
				email,
				today,
				name,
				checkIn,
				checkOut,
				rooms,

				price,
			};

			// send data to the server
			fetch("http://localhost:3000/bookings", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newBooking),
			})
				.then((res) => res.json())
				.then((data) => {
					console.log(data);
					if (data.insertedId) {
						Swal.fire({
							title: "Success!",
							text: "Successfully Added in th Bookings",
							icon: "success",
							confirmButtonText: "Confirmed",
						});
						const roomDecre = roomCount - rooms;
						setRoomCount(roomDecre);
						// Reset the form
						form.reset();
					} else {
						Swal.fire({
							title: "Error!",
							text: "Failed To Add In The Bookings",
						});
					}
				});
			//setRoomCount(e);
		} else {
			Swal.fire({
				title: "Oops...",
				text: "No available Rooms!",
			});
		}
	};
	//     ● Room Description
	// ● Price per Night
	// ● Room Size
	// ● Availability
	// ● Room Images

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
						<form onSubmit={handleBookNow}>
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
												defaultValue={
													roomDetails.rooms.price
												}
												className="input input-bordered w-full"
											/>
										</label>
									</div>
								</div>

								<div className="text-center">
									<input
										type="submit"
										value="Book Now"
                                        disabled={roomCount <= 0}
										className="btn bg-[#20292e] text-[#c5c4c4]  md:w-1/2 text-center border-0"
									/>
									
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
