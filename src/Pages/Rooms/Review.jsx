

const Review = ({review}) => {
    console.log(review);
   
    return (
        <div>
            <p>{review.customer_name}</p>
            <p>{review.review_text}</p>
            <p>{review.rating}</p>
        </div>
    );
};

export default Review;