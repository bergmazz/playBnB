import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import { getSpotThunk } from "../../store/spots";
import './spotDetails.css'

const SpotDetails = () => {
      const { id } = useParams()
      const dispatch = useDispatch()
      const spot = useSelector( ( state ) => state.spots.current )

      useEffect( () => {
            dispatch(getSpotThunk( id ) )
      }, [ dispatch, id, ] )

      return (
            <div>
                  { spot && ( <div className="spot-detail-container">

                        <div className="spot-info">
                                    <h2>{ spot.name }</h2>
                                    <p>{ spot.city }, { spot.state }, { spot.country }</p>
                        </div>

                              <div className="spot-container">
                                    { spot.SpotImages && spot.SpotImages.map( image => (
                                          <img key={ image.id } src={ image.url } alt={ spot.name }></img>
                                    ) ) }
                                </div>

                        <div className="owner">
                                    <p>Hosted by { spot.Owner.firstName } { spot.Owner.lastName }</p>
                        </div>

                                    <div className="booking">
                                                <div className="book-price">
                                                      <p>${ spot.price } night</p>
                                                </div>
                                                <div className='book-star'>
                                                      <p><i className="fa-solid fa-star"></i>{ spot.avgStarRating }</p>
                                                </div>
                                                <div className="book-review-count" >
                                                      <p>{ spot.numReviews ? spot.numReviews : 'New' }</p>
                                                </div>
                                          <button className="RSVP-btn">Reserve</button>
                                    </div>

                        </div>

                  )
                  }
            </div>
      )
}


export default SpotDetails
