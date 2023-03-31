import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import './landing.css';


function LandingPage () {
      console.log("landing")
      const dispatch = useDispatch()
      const [ isLoaded, setIsLoaded ] = useState( false )
      let spotsObj = useSelector( ( state ) => state.spots )
      // console.log( "--------spotsobj v1------", spotsObj)
      let innerObj = spotsObj[ 'spots' ]
      // console.log( "-----------innerObj-----", innerObj )
      // let page = innerObj["page"]
      // let size = innerObj[ "size" ]
      let spots = innerObj["Spots"]
      // let spots = Object.values( innerObj )

      // console.log( "--------spotsarr------", spots )

      useEffect( () => {
            dispatch( spotActions.populateSpotsThunk() ).then( () => setIsLoaded( true ) )
      }, [ dispatch ] )

spots.map( ( spot ) => (console.log(spot)))
      return (
            <div className="spots-container">
                  { isLoaded &&
                        spots.map( ( spot ) => ( <div className='card' key={ spot.id }>
                              <NavLink to={ `/spots/${ spot.id }` }>
                                    <img className="img" src={ spot.previewImage } alt={ spot.description } />
                                    <div className="info">{ spot.city },{ spot.state }</div>
                                    <div className="price">${ spot.price } night</div>
                                    <div className="star">{ spot.avgRating }<i className='fa-solid fa-star' /></div>
                              </NavLink>
                        </div> ) ) }
            </div>
      )
}

export default LandingPage
