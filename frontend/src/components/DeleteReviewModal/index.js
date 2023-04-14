import React from "react";
import * as reviewActions from "../../store/reviews";
import * as spotActions from '../../store/spots'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './DeleteReview.css'

function DeleteReviewModal ( {reviewId}) {
      const dispatch = useDispatch();
      const { closeModal } = useModal();
      console.log( "-----------reviewId-----------",reviewId )
      const reviews = useSelector( ( state ) => state.review.Reviews )
      console.log( "-----------reviews-----------", reviews )
      let spotId;
      for ( let review of reviews ) {
            if ( review.id === reviewId ) {
                  spotId = review.spotId
            }
      }

      const handleDelete = async ( e ) => {
            e.preventDefault();
            // console.log(reviewId.reviewId)
             await dispatch( reviewActions.removeReviewThunk( reviewId ) )
            await ( dispatch( reviewActions.getReviewsThunk( spotId) ) )
         await dispatch( spotActions.getSpotThunk( spotId ) )
            .then(closeModal())
      }

      return (
            <div className="delete-review-container">
                  <h1>Confirm Delete</h1>
                  <h3>Are you sure you want to delete this review?</h3>
                  <button type='submit' onClick={ handleDelete } className="yees">Yes (Delete Review)</button>
                  <button onClick={ closeModal } className="noo">No (Keep Review)</button>
            </div>
      );
}

export default DeleteReviewModal;
