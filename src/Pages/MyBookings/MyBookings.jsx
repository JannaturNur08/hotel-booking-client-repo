import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import Swal from "sweetalert2";
import moment from "moment";
import { Link } from "react-router-dom";

const MyBookings = () => {
	const { user } = useAuth();
	console.log(user);
	const email = user.email;
	//const userId = user.uid;
	const [myBookings, setMyBookings] = useState([]);
	const { _id, bookingDate } = myBookings;
	//const categoryId = myBookings._id;
	//const checkIn = myBookings.checkIn;
	const [newCheckInDate, setNewCheckInDate] = useState(bookingDate);
	const [openDateUpdateModalId, setOpenDateUpdateModalId] = useState(null);
	const [openReviewModalId, setOpenReviewModalId] = useState(null);
	const [review, setReview] = useState({
		categoryId:'',
		userName: "",
		rating: 5,
		comment: "",
	});
	console.log(newCheckInDate);

	const openDateUpdateModal = (bookingId) => {
		setOpenDateUpdateModalId(bookingId);
	};

	// Function to close the date update modal
	const closeDateUpdateModal = () => {
		setOpenDateUpdateModalId(null);
	};

	// Function to open the review modal
	const openReviewModal = (bookingId) => {
		setOpenReviewModalId(bookingId);
	};

	// Function to close the review modal
	const closeReviewModal = () => {
		setOpenReviewModalId(null);
	};
	const canDeleteBooking = (checkInDate) => {
		const checkInMoment = moment(checkInDate);
		const now = moment();
		const hoursDifference = checkInMoment.diff(now, "hours");
		return hoursDifference >= 24;
	};

	useEffect(() => {
		fetch(`http://localhost:3000/bookings/${email}`)
			.then((res) => res.json())
			.then((data) => setMyBookings(data));
	}, [email]);
	console.log(myBookings);

	const handleDelete = (_id, checkInDate) => {
		if (canDeleteBooking(checkInDate)) {
			// make sure user confirm to delete
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then((result) => {
				if (result.isConfirmed) {
					fetch(`http://localhost:3000/bookings/${_id}`, {
						method: "DELETE",
					})
						.then((res) => res.json())
						.then((data) => {
							console.log(data);
							if (data.deletedCount > 0) {
								Swal.fire(
									"Deleted!",
									"Item has removed from the Booking",
									"success"
								);
							}
							const remaining = myBookings.filter(
								(cart) => cart._id !== _id
							);
							setMyBookings(remaining);
							console.log(myBookings);
						});
				}
			});
		} else {
			Swal.fire({
				title: "Cannot Delete",
				text: "You can only cancel a booking 24 hours before the checkout date.",
				icon: "warning",
			});
		}
	};
	const handleConfirmButton = (bookingId) => {
		//e.preventDefault();
		//const form = e.target;
		const bookingDate = document.querySelector(
			`input[name="Check_in_Date_${bookingId}"]`
		).value;

		fetch(`http://localhost:3000/booking/${bookingId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ bookingDate: bookingDate }),
		})
			.then((res) => {
				if (!res.ok) {
					throw new Error("Failed to update booking");
				}
				return res.json();
			})
			.then((data) => {
				// Debugging: log the data received from the server
				console.log(data);

				if (data.message === "Date Updated successfully") {
					const updatedMyBookings = myBookings.map((booking) => {
						if (booking._id === bookingId) {
							return { ...booking, bookingDate };
						}
						return booking;
					});
					setMyBookings(updatedMyBookings);
					setNewCheckInDate(bookingDate);

					Swal.fire({
						title: "Success!",
						text: "Updated  Date Successfully",
						icon: "success",
						confirmButtonText: "Confirmed",
					});
					//closeModal();
				}
			})
			.catch((error) => {
				// Handle network errors or server errors here
				console.error("An error occurred:", error);
			});
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setReview((prev) => ({ ...prev, [name]: value }));
	};

	// Function to post a review
	const postReview = async (categoryId) => {
		try {
			const newReview = {
				categoryId,
				userName: review.userName,

				rating: review.rating,
				comment: review.comment,
			};

			const response = await fetch("http://localhost:3000/api/reviews", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(newReview),
			});
			const data = await response.json();
			if (data) {
				// Handle success
				console.log("Review submitted", data);
				Swal.fire({
					title: "Success!",
					text: "Submitted review Successfully",
					icon: "success",
					confirmButtonText: "Confirmed",
				});
			}
		} catch (error) {
			// Handle error
			console.error("Error submitting review:", error);
		}
	};

	const handleReviewSubmit = (e) => {
		e.preventDefault();
		postReview();
	};

	return (
		<div>
			<h2>My bookings page</h2>
			<div className="mx-auto container mt-10 mb-10 lg:w-1/2">
				<div>
					<table className=" table ">
						{/* head */}
						<thead>
							<tr>
								<th>Index</th>
								{/* <th>Email</th> */}
								<th>Category Id</th>

								<th>Booking Date</th>
								<th>Price</th>
								<th>Cancel</th>
								<th>Update Date</th>
								<th>Review</th>
							</tr>
						</thead>
						<tbody>
							{/* row 1 */}
							{myBookings.map((user, index) => (
								<tr key={user._id}>
									<th>{index + 1}</th>
									{/* <td>{user.email}</td> */}
									<td>{user.categoryId}</td>

									<td>{user.bookingDate}</td>
									<td>{user.price}</td>
									<td>
										<button
											onClick={() =>
												handleDelete(
													user._id,
													user.bookingDate
												)
											}
											className="btn">
											X
										</button>
									</td>
									<td>
										<div>
											<button
												className="btn bg-gray-600 text-white"
												onClick={() =>
													openDateUpdateModal(
														user._id
													)
												}>
												Update Date
											</button>
											{openDateUpdateModalId ===
												user._id && (
												<dialog
													open
													className="modal"
													id={`update-modal-${user._id}`}>
													<div className="modal-box">
														<input
															type="date"
															name={`Check_in_Date_${user._id}`}
															placeholder="Check in Date"
															defaultValue={
																user.bookingDate
															}
															className="input input-bordered w-full"
														/>
														<div className="modal-action">
															<button
																className="btn"
																onClick={() =>
																	handleConfirmButton(
																		user._id
																	)
																}>
																Confirm
															</button>
															<button
																className="btn"
																onClick={() =>
																	closeDateUpdateModal(
																		user._id
																	)
																}>
																Close
															</button>
														</div>
													</div>
												</dialog>
											)}
										</div>
									</td>
									<td>
										<div>
											<button
												className="btn bg-slate-600 text-white"
												onClick={() =>
													openReviewModal(user._id)
												}>
												Review
											</button>
											{openReviewModalId === user._id && (
												<dialog
													open
													className="modal"
													id={`review-modal-${user._id}`}>
													<form
														onSubmit={
															handleReviewSubmit
														}>
														<div className="p-5">
															<div>
																<input
																	type="text"
																	name="categoryId"
																	value={
																		user.categoryId
																	}
																	readOnly
																	required
																	className="input input-bordered w-full"
																/>
															</div>
															<div>
																<input
																	type="text"
																	name="userName"
																	placeholder="User Name"
																	value={
																		review.userName
																	}
																	onChange={
																		handleInputChange
																	}
																	required
																	className="input input-bordered w-full"
																/>
															</div>
															<div>
																<input
																	type="text"
																	name="rating"
																	placeholder="Rating"
																	
																	
																	required
																	className="input input-bordered w-full"
																/>
															</div>
															<div>
																<textarea
																	name="comment"
																	placeholder="Comment"
																	value={
																		review.comment
																	}
																	onChange={
																		handleInputChange
																	}
																	required
																	className="input input-bordered w-full"
																/>
															</div>
														</div>
														<button
															type="submit"
															className="btn">
															Submit Review
														</button>
														<button
															className="btn ml-3"
															onClick={() =>
																closeReviewModal(
																	user._id
																)
															}>
															Close
														</button>
													</form>
												</dialog>
											)}
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default MyBookings;
