import { useLoaderData } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import moment from "moment/moment";
import { useEffect, useState } from "react";

const RoomDetails = () => {
	// for getting user email
	const { user } = useAuth();
	const email = user.email;
	console.log(email);
	const roomDetails = useLoaderData();
	const { _id, category_name, rooms, description } = roomDetails;
	const roomImages = roomDetails.rooms.room_images;

	const [minCheckInDate, setMinCheckInDate] = useState("");
	const [minCheckOutDate, setMinCheckOutDate] = useState("");

	useEffect(() => {
		const now = moment().format("YYYY-MM-DD");
		setMinCheckInDate(now);
	}, []);

	const handleCheckInDateChange = async (e) => {
		const selectedDate = e.target.value;
		const CheckOutDate = moment(selectedDate)
			.add(1, "days")
			.format("YYYY-MM-DD");
		setMinCheckOutDate(CheckOutDate);
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
						<div className="text-center mt-4"></div>
						<form id="bookingForm">
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
											name="userRoom"
											placeholder={`Available Rooms ${rooms.maxRooms}`}
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
												defaultValue={rooms.price}
												className="input input-bordered w-full"
											/>
										</label>
									</div>
								</div>

								<div className="text-center">
									<button
										// onClick={openModal}
										// onClick={() =>
										// 	document
										// 		.getElementById("my_modal_1")
										// 		.showModal()
										// }

										className="btn bg-[#20292e] text-[#c5c4c4]  md:w-1/2 text-center border-0">
										Book Now
									</button>

									<dialog id="my_modal_1" className="modal">
										<div className="modal-box">
											<h3 className="font-bold text-lg">
												Name :{category_name}
											</h3>
											<p className="py-4">
												Check-In-Date :
											</p>
											<p className="py-4">
												Check-Out-Date:{" "}
												{minCheckOutDate}
											</p>

											<p className="py-4">Price :</p>
											<div className="modal-action">
												<form method="dialog">
													{/* if there is a button in form, it will confirm the modal */}
													<button className="btn">
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
