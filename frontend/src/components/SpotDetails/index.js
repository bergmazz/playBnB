import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import * as spotActions from "../../store/spots";
// import * as reviewActions from "../../store/reviews"
import './spotDetails.css'

const SpotDetails = () => {
      const { id } = useParams()
      const dispatch = useDispatch()
      const [ isLoaded, setIsLoaded ] = useState( false )
      const spot = useSelector( ( state ) => state.spots )

      useEffect( () => {
            dispatch( spotActions.getSpotThunk(id) )
                  // .then( dispatch( reviewActions.populateSpotReviews( spotId ) ) )
                  .then( () => setIsLoaded( true ) )
      }, [ dispatch, id ] )

      const comingSoon = () => {
            alert( "Feauture coming soon" );
      }

      return (

         <div>
                  { !spot ?
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
                                    { spot.SpotImages && spot.SpotImages.map( image => (
                                          <img key={ image.id } src={ image.url } alt={ spot.name }></img>
                                    ) ) }
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
                              <div className="review-container">
                                    { spot.Reviews && spot.Reviews.reverse().map( review => (
                                          <div key={ review.id }>

                                          </div>
                                    ) ) }                              </div>

                              </div>
                        )}
            </div>
            )
}



export default SpotDetails
