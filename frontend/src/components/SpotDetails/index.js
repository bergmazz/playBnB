import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import OpenModalButton from '../OpenModalButton';

import Reviews from "../Reviews";
import * as spotActions from "../../store/spots";
import * as reviewActions from "../../store/reviews"
import ReviewFormModal from '../ReviewFormModal';
import './spotDetails.css'

const SpotDetails = () => {
      const { id } = useParams()
      const dispatch = useDispatch()
      const [ isLoaded, setIsLoaded ] = useState( false )
      const spot = useSelector( ( state ) => state.spots[id] )
      // const currentUser = useSelector( ( state ) => state?.session?.user );

      useEffect( () => {
            dispatch( spotActions.getSpotThunk(id) )
                  .then( dispatch( reviewActions.getReviewsThunk(id ) ) )
                  .then( () => setIsLoaded( true ) )
      }, [ dispatch, id ] )

      const comingSoon = () => {
            alert( "Feauture coming soon" );
      }

      // console.log( "reviews-----------------------", reviews)
      // const spotOwner = currentUser && spot && currentUser.id === spot.ownerId

      return (

         <div>
                  { !spot || !spot.Owner ?
                        (
                        <div className="loading">Loading spot...</div>
                  ) :
                              isLoaded && ( <div className="spot-detail-container">
                                    <div className="spot-info">
                                    <h2>{ spot.name }</h2>
                                    <p>{ spot.city }, { spot.state }, { spot.country }</p>
                        </div>

                        <div className="spot-img-container">

                              <img className="preview" src={ spot.previewImage } alt={ spot.name }></img>
                                    {/* { spot.SpotImages && spot.SpotImages.map( image => (
                                          <img key={ image.id } src={ image.url } alt={ spot.name }></img>
                                    ) ) } */}
                                    { spot.SpotImages  ? (
                                          <>
                                                { spot.SpotImages.map( ( image ) => (
                                                      <img key={ image.id } src={ image.url } alt={ spot.name } />
                                                ) ) }
                                          </>
                                    ) : (
                                                            <>
                                                      <img src={ spot.previewImage } alt={ spot.name } />
                                                       <img src={ spot.previewImage } alt={ spot.name } />
                                                        <img src={ spot.previewImage } alt={ spot.name } />
                                                                  <img src={ spot.previewImage } alt={ spot.name } />
                                                                 </>
                                    ) }

                        </div >

             <div className="more-info">
                               <div>
                              <p className="owner">Hosted by { spot.Owner.firstName } { spot.Owner.lastName }</p>
                                    <p className="spotDescription">{ spot.description }</p>
                              </div>
                                    <div className="book-container">
                                                <div className="book-price">
                                                <p className= "big">${ spot.price }</p> <p className="smol">  night</p>
                                                </div>
                                                <div className='book-star'>
                                                <p><i className="fa-solid fa-star"></i>
                                                      { !isNaN( spot.avgRating ) ? spot.avgRating.toFixed( 1 ) : spot.avgRating }
                                                </p>
                                                </div>
                                                <div className="book-review-count" >
                                                <p>{ spot.Reviews.length } {spot.Reviews.length === 1 ? 'review' : 'reviews'}</p>
                                                </div>
                                          <button onClick={comingSoon} className="book-btn">Reserve</button>

                              </div>
                        </div>

                         <div className='review-star'>
                                    { isNaN( spot.avgRating ) ? ( <p><i className="fa-solid fa-star"></i> { spot.avgRating } </p> ) :
                                          ( <p><i className="fa-solid fa-star"></i> { spot.avgRating.toFixed(1) }    ·    { spot.Reviews.length } { spot.Reviews.length === 1 ? 'review' : 'reviews' }</p> )
                                    }
                              </div>
                                    <div className = "review-btn">
                              <OpenModalButton
                                    buttonText="Post your review"
                                    modalComponent={ <ReviewFormModal /> }
                                    />
                                    </div>

                              <div className="review-container">
                                    { spot.Reviews[0]  ? (
                                          <Reviews spotId={ spot.id } />
                                    ) : ( <div classname="no-reviews"> Be the first to post a review</div> )
                                    }
                              </div>

                              </div>
                        )}
            </div>
            )
}



export default SpotDetails
