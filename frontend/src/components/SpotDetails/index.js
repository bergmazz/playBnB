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
                                                      <p>${ spot.price } night</p>
                                                </div>
                                                <div className='book-star'>
                                                      <p><i className="fa-solid fa-star"></i>{ spot.avgRating }</p>
                                                </div>
                                                <div className="book-review-count" >
                                                      <p>{ spot.numReviews } reviews</p>
                                                </div>
                                          <button className="book-btn">Reserve</button>

                              </div>
                        </div>

                         <div className='review-star'>
                              <p><i className="fa-solid fa-star"></i>{ spot.avgRating }</p>
                        </div>
                              <div className="review-count" >
                                    <p>{ spot.numReviews } reviews</p>
                              </div>


             </div>

                  )
                  }
            </div>
      )
}


export default SpotDetails
