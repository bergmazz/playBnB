import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as spotActions from '../../store/spots';
import { useDispatch, useSelector } from "react-redux";
import './landing.css';

const LandingPage = ({isLoaded}) => {
      const dispatch = useDispatch()
      let spots = useSelector( ( state ) => state.spots )
      // console.log( "----------state-------", spots ) // currently logging:
      // console.log( "----------state spots-------", spots.spots ) // currently returning: undefined

      useEffect( () => {
            dispatch( spotActions.populateSpotsThunk() );
      }, [ dispatch ] )
      return (
            <div className="spots-container">
                  { isLoaded && spots.spots.length > 0 ? (
                        spots.spots.map( ( spot ) => (
                              <div className="card" key={ spot.id }>
                                    <NavLink to={ `/spots/${ spot.id }` }>
                                          <div className="card-crop">
                                          <div className = "img-crop">
                                                <img className="img" src={ spot.previewImage } alt={ spot.description } />
                                                </div>
                                                <div className="info-container">
                                          <div className="info">
                                                { spot.city }, { spot.state }
                                          </div>
                                          <div className="price">${ spot.price } night</div>
                                          <div className="star">
                                                { spot.avgRating }
                                                <i className="fa-solid fa-star" />
                                                      </div>
                                                      </div>
                                                </div>
                                    </NavLink>
                              </div>
                        ) )
                  ) : (
                        <div>Loading spots...</div>
                  ) }
            </div>
      );
};

export default LandingPage
