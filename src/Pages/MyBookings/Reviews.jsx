import { useState } from "react";
import { useParams } from "react-router-dom";


const Reviews = () => {
    const {categoryId} = useParams();
    const [review, setReview] = useState({
        categoryId: categoryId,
        userName : '',
        rating: 5,
        comment: '',
        
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setReview(prev => ({ ...prev, [name]: value }));
    };


      // Function to post a review
      const postReview = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(review),
            });
            const data = await response.json();
            if (data) {
                // Handle success
                console.log('Review submitted', data);
                // You may want to close the modal or clear the form here
            }
        } catch (error) {
            // Handle error
            console.error('Error submitting review:', error);
        }
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        postReview();
    };

    return (
        <div>

<form onSubmit={handleReviewSubmit}>
            <input
                type="text"
                name="userName"
                value={review.userName}
                onChange={handleInputChange}
                required
            />
            <input
                type="number"
                name="rating"
                value={review.rating}
                onChange={handleInputChange}
                required
            />
            <textarea
                name="comment"
                value={review.comment}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Submit Review</button>
        </form>
            
        </div>
    );
};

export default Reviews;