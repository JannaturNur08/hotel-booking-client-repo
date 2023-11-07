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
	const { _id, category_name, checkIn } = myBookings;
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
	const handleUpdateDate = (e) => {
		//e.preventDefault();
		const form = e.target;
		const checkIn = form.Check_in_Date.value;
		//const category_name = myBookings.category_name;
		const updatedData = {
			category_name,
			checkIn,
		};
		fetch(`http://localhost:3000/bookings/${_id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
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

				if (data && data.checkIn) {
					// Update your UI with the new check-in date
					setNewCheckInDate(data.checkIn);

					// Successfully updated booking
					Swal.fire({
						title: "Success!",
						text: "Successfully updated the booking",
						icon: "success",
						confirmButtonText: "Confirmed",
					});
				} else {
					// Failed to update booking
					Swal.fire({
						title: "Error!",
						text: "Failed to update the booking",
					});
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
										<form onSubmit={handleUpdateDate}>
											<label className="input-group">
												<input
													type="date"
													name="Check_in_Date"
													className="input input-bordered w-full"
													value={newCheckInDate}
													onChange={handleUpdateDate}
												/>
											</label>
										</form>
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
