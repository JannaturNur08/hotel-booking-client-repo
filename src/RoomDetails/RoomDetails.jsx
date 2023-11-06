import { useLoaderData } from "react-router-dom";
import useReviewCount from "../hooks/useReviewCount";

const RoomDetails = () => {
	const roomDetails = useLoaderData();

	console.log(roomDetails.rooms.room_images);
	const roomImages = roomDetails.rooms.room_images;
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
							<p>{roomDetails.description}</p>
							<p className="font-mercellus text-3xl">
								Family-friendly Amenities
							</p>
							<div className="flex flex-row gap-3">
								<p>Kids Swimming Pool</p>
								<p>Extra Beds/Baby Crib</p>
								<p>Washing Machine</p>
							</div>
						</div>
					</div>
					<div>
						<form>
							{/* form row */}
							<div className="mb-8 mt-5">
								<div className="form-control md:w-1/2 mx-auto mb-2">
									<label className="label">
										<span className="label-text text-[#e2e2e2]">
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
										<span className="label-text text-[#e2e2e2]">
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
										<span className="label-text text-[#e2e2e2]">
											Rooms
										</span>
									</label>
									<label className="input-group border-0">
										<input
											type="text"
											name="rooms"
											placeholder="Rooms"
											className="input input-bordered w-full"
										/>
									</label>
								</div>
								<div className="form-control md:w-1/2 mx-auto mb-2">
									<label className="label">
										<span className="label-text text-[#e2e2e2]">
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
										<span className="label-text text-[#e2e2e2]">
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
											<span className="label-text text-[#e2e2e2]">
												Total Cost
											</span>
										</label>
										<label className="input-group">
											<input
												type="text"
												name="details"
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
