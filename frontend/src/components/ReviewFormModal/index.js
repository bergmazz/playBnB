import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import { useModal } from "../../context/Modal";
import { postReviewThunk, getReviewsThunk } from "../../store/reviews";
import { getSpotThunk} from "../../store/spots";
import './ReviewForm.css';


const ReviewFormModal = ( { spotId } ) => {
      const dispatch = useDispatch()
      // const history = useHistory()
      const { closeModal } = useModal();

      const [ csrfToken, setCsrfToken ] = useState( '' )
      const [ stars, setStars ] = useState( 0 );
      const [ description, setDescription ] = useState( '' );
      const [ errors, setErrors ] = useState( [] )

      const updateStars = ( e ) => setStars( e.target.value );
      const updateDescription = ( e ) => setDescription( e.target.value );
      const handleSubmit = async ( e ) => {
            e.preventDefault();
            setErrors( [] )
            let errorsArr = []
            if ( description.length < 10 ) {
                  errorsArr.push( 'Description needs a minimum of 10 characters' )
            }
            if ( stars < 1 ) {
                  errorsArr.push( "Please select a rating" )
            }
            setErrors( errorsArr )

            if ( errorsArr.length ) {
                  return errors
            }

            const payload = {
                  review: description,
                  stars,
                  spotId,
            };
            const newReview = await dispatch( postReviewThunk( payload ) );

            if ( newReview ) {
                  // history.push( `/spots/${ spotId }` )
                  await dispatch( getSpotThunk( spotId ) ).then( closeModal )
            }
            // await dispatch( getReviewsThunk( spotId ) );

            return newReview;
      }
      return (
            <div className="review-modal-container">
                  <form className="review-modal" onSubmit={ handleSubmit }>
                        <h2>How was your stay?</h2>
                        <input
                              type="text"
                              name="review"
                              placeholder="Leave your review here"
                              onChange={ updateDescription }
                              required
                        />
                        <div className="star-rating">
                              <input
                                    type="radio"
                                    id="star-5"
                                    name="stars"
                                    value="1"
                                    onChange={ updateStars }
                                    required
                              />
                              <label htmlFor="star-5">
                                    <i className="fas fa-star"></i>
                              </label>
                              <input
                                    type="radio"
                                    id="star-4"
                                    name="stars"
                                    value="2"
                                    onChange={ updateStars }
                                    required
                              />
                              <label htmlFor="star-4">
                                    <i className="fas fa-star"></i>
                              </label>
                              <input
                                    type="radio"
                                    id="star-3"
                                    name="stars"
                                    value="3"
                                    onChange={ updateStars }
                                    required
                              />
                              <label htmlFor="star-3">
                                    <i className="fas fa-star"></i>
                              </label>
                              <input
                                    type="radio"
                                    id="star-2"
                                    name="stars"
                                    value="4"
                                    onChange={ updateStars }
                                    required
                              />
                              <label htmlFor="star-2">
                                    <i className="fas fa-star"></i>
                              </label>
                              <input
                                    type="radio"
                                    id="star-1"
                                    name="stars"
                                    value="5"
                                    onChange={ updateStars }
                                    required
                              />
                              <label htmlFor="star-1">
                                    <i className="fas fa-star"></i>
                              </label>
                        </div>
                        <button className="review-modal-btn" type="submit">
                              Submit Your Review
                        </button>
                  </form>
            </div>
      );
}

export default ReviewFormModal
