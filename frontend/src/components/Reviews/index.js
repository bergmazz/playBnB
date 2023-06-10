import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsThunk } from "../../store/reviews";
import OpenModalButton from "../OpenModalButton";
import DeleteReviewModal from "../DeleteReviewModal";

const Reviews = ({ spotId }) => {
  const dispatch = useDispatch();
  let reviews = {};
  reviews = useSelector((state) => state.review.Reviews);
  // console.log("---------------reviews", reviews)
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getReviewsThunk(spotId));
  }, [dispatch, spotId]);

  return (
    <>
      {reviews &&
        reviews.map((review) => (
          <div key={review.id} className="rev">
            <h2>{review.User.firstName}</h2>
            <h3>
              {review.createdAt &&
                new Date(review.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
            </h3>
            <p>{review.review}</p>
            {currentUser && currentUser.id === review.userId && (
              <OpenModalButton
                buttonText="Delete"
                modalComponent={<DeleteReviewModal reviewId={review.id} />}
              />
            )}
          </div>
        ))}
    </>
  );
};

export default Reviews;
