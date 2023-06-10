import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from 'react-router-dom';
// import { useParams } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { postReviewThunk, getReviewsThunk } from "../../store/reviews";
import { getSpotThunk } from "../../store/spots";
import "./ReviewForm.css";

const ReviewFormModal = ({ spotId }) => {
  // const { spotId } = useParams()
  // console.log("-----------------------spotid----------------", spotId)
  const dispatch = useDispatch();
  // const history = useHistory()
  const { closeModal } = useModal();

  // const [ csrfToken, setCsrfToken ] = useState( '' )
  const [stars, setStars] = useState(0);
  const [review, setReview] = useState("");
  const [errors, setErrors] = useState([]);

  const updateStars = (e) => setStars(parseInt(e.target.value));
  const updateReview = (e) => setReview(e.target.value);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    let errorsArr = [];
    if (review.length < 10) {
      errorsArr.push("Review needs a minimum of 10 characters");
    }
    if (stars < 1) {
      errorsArr.push("Please select a rating");
    }
    setErrors(errorsArr);

    if (errorsArr.length) {
      return errors;
    }

    const payload = {
      review,
      stars,
      spotId,
    };
    const newReview = await dispatch(postReviewThunk(payload));

    if (newReview) {
      // history.push( `/spots/${ spotId }` )
      await dispatch(getReviewsThunk(spotId));
      await dispatch(getSpotThunk(spotId)).then(closeModal);
    }

    return newReview;
  };
  return (
    <div className="review-modal-container">
      <form className="review-modal" onSubmit={handleSubmit}>
        <h2>How was your stay?</h2>
        <textarea
          type="text"
          name="review"
          placeholder="Leave your review here"
          onChange={updateReview}
          required
        />
        <div className="star-rating">
          <input
            type="radio"
            name="stars"
            id="star-5"
            value={5}
            onClick={updateStars}
          />
          <label htmlFor="star-5"></label>

          <input
            type="radio"
            name="stars"
            id="star-4"
            value={4}
            onClick={updateStars}
          />
          <label htmlFor="star-4"></label>

          <input
            type="radio"
            name="stars"
            id="star-3"
            value={3}
            onClick={updateStars}
          />
          <label htmlFor="star-3"></label>

          <input
            type="radio"
            name="stars"
            id="star-2"
            value={2}
            onClick={updateStars}
          />
          <label htmlFor="star-2"></label>

          <input
            type="radio"
            name="stars"
            id="star-1"
            value={1}
            onClick={updateStars}
          />
          <label htmlFor="star-1"></label>
        </div>
        <button
          className="review-modal-btn"
          type="submit"
          disabled={stars === 0 || review.length < 10}
          onClick={handleSubmit}
        >
          Submit Your Review
        </button>
      </form>
    </div>
  );
};

export default ReviewFormModal;
