import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import OpenModalButton from '../OpenModalButton';
import SpotFormModal from "../SpotFormModal";
import UpdateSpotModal from "../UpdateSpotModal";
import DeleteSpotModal from '../DeleteSpotModal'
import './current.css'


function CurrentUserSpots () {
      const dispatch = useDispatch()
      const [ isLoaded, setIsLoaded ] = useState( false )
      // const [ showMenu, setShowMenu ] = useState( false );
      const [ userSpots, setUserSpots ] = useState( [] );
      let spots = useSelector( ( state ) => state.spots )
      let user = useSelector( ( state ) => state.session )

      useEffect( () => {
            dispatch( spotActions.populateSpotsThunk() ).then( () => setIsLoaded( true ) )
      }, [ dispatch ] )

      useEffect( () => {
            const  spotsArr = Object.values( spots )
    setUserSpots(spotsArr.filter( spot => spot.ownerId === user.user.id ))
      }, [ spots ] )

      // const closeMenu = () => setShowMenu( false );

      return (
            <div>
                  <div className = "top">
                  <h1>Manage Spots</h1>
                  <OpenModalButton
                        buttonText="Create a new spot"
                        modalComponent={ <SpotFormModal /> }
                        />
                  </div>

                  <div className="current-spots-container">
                        { spots === null || spots === undefined ? (
                              <div className="loading">Loading spots...</div>
                        ) :
                              isLoaded && (
                                    userSpots.map( ( spot ) => (
                                          <div className="card" key={ spot.id }>
                                                <NavLink to={ `/spots/${ spot.id }` }>
                                                      <div className="card-crop">
                                                            <div className="img-crop">
                                                                  <img className="img" src={ spot.previewImage } alt={ spot.description } />
                                                            </div>
                                                            <div className="info-container">
                                                                  <div className="info">
                                                                        { spot.city }, { spot.state }
                                                                  </div>
                                                                  <div className="price">${ spot.price } night</div>
                                                                  <div className="star">
                                                                        <i className="fa-solid fa-star"> { isNaN( spot.avgRating ) ? "New" : spot.avgRating }</i>
                                                                  </div>
                                                            </div>
                                                      </div>
                                                </NavLink>
                                                <div>
                                                      {/* <button className="button-class-update-spot"><NavLink to={ `/spots/${ spot.id }/edit` }>UPDATE</NavLink></button>
                                                      */}
                                                      <OpenModalButton
                                                            buttonText="Update"
                                                            className='update'
                                                            modalComponent={ <UpdateSpotModal spotId={ spot.id } /> }
                                                      />

                                                      <OpenModalButton
                                                            buttonText="Delete"
                                                            className='delete'
                                                            modalComponent={ <DeleteSpotModal spot= { spot}  /> }
                                                    />
                                                </div>
                                          </div>
                                    ) )
                              ) }
                  </div>
            </div>
      )
}

export default CurrentUserSpots
