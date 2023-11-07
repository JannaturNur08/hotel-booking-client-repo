import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import Swal from "sweetalert2";
import moment from "moment";

const MyBookings = () => {
	const { user } = useAuth();
	console.log(user);
	const email = user.email;
	const [myBookings, setMyBookings] = useState([]);
	const { _id,  checkIn } = myBookings;
	//const checkIn = myBookings.checkIn;
	const [newCheckInDate, setNewCheckInDate] = useState(checkIn);
	console.log(newCheckInDate);

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
	const handleConfirmButton = () => {
		//e.preventDefault();
		//const form = e.target;
		const checkIn = document.querySelector('input[name="Check_in_Date"]').value;
		setNewCheckInDate(checkIn);
    
		console.log(checkIn);
		// const updatedDate = {
		// 	checkIn, // Field name "checkIn" with the value
		// };
		//const category_name = myBookings.category_name;
		
		fetch(`http://localhost:3000/bookings/${_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({checkIn : checkIn}),
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
					Swal.fire({
						title: "Success!",
						text: "Updated  Date Successfully",
						icon: "success",
						confirmButtonText: "Confirmed",
					});
					setNewCheckInDate(checkIn);
				}
			})
			.catch((error) => {
				// Handle network errors or server errors here
				console.error("An error occurred:", error);
			});
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
								<th>Category Name</th>
								<th>Email</th>
								<th>Price</th>
								<th>Date</th>
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
									<td>{user.category_name}</td>
									<td>{user.email}</td>
									<td>{user.price}</td>
									<td>{user.checkIn}</td>
									<td>
										<button
											onClick={() =>
												handleDelete(
													user._id,
													user.checkIn
												)
											}
											className="btn">
											X
										</button>
									</td>
									<td>
										<div>
											<button
												className="btn bg-primary text-white"
												onClick={() =>
													document
														.getElementById(
															"my_modal_1"
														)
														.showModal()
												}>
												Update Button
											</button>
											<dialog
												id="my_modal_1"
												className="modal">
												<div className="modal-box">
													<input
														type="date"
														name="Check_in_Date"
														placeholder="Check in Date"
														className="input input-bordered w-full"
													/>
													<div className="modal-action">
														<form method="dialog" onSubmit={handleConfirmButton}>
															{/* if there is a button in form, it will confirm the modal */}
															<button className="btn" >
																Confirm
															</button>
														</form>
													</div>
												</div>
											</dialog>
										</div>
									</td>
									<td>
										<button className="btn">Review</button>
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
