import { csrfFetch } from './csrf';

const POPULATE_SPOTS = 'spots/POPULATE_SPOTS';
const GET_SPOT = 'spots/GET_SPOT';
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const ADD_SPOT = 'spots/ADD_SPOT'
// const ADD_IMAGE = 'spots/ADD_IMAGE'
const DELETE_SPOT = 'spots/DELETE_SPOT';

const populateSpots = ( spots ) => {
      return {
            type: POPULATE_SPOTS,
            payload: spots
      }
}

const spotDetails = ( spot ) => {
      return {
            type: GET_SPOT,
            payload: spot
      }
}

const addSpot = (spot) => {
      return {
            type: ADD_SPOT,
            payload: spot
      }
}

const editSpot = ( spot ) => {
      return {
            type: UPDATE_SPOT,
            payload: spot
      }
}

const deleteSpot = ( spotId ) => {
      return {
            type: DELETE_SPOT,
            payload: spotId
      }
}
// const addImageToSpot = ( spotId, image ) => {
//       return {
//             type: ADD_IMAGE,
//             payload: { spotId, image }
//       }
// }

export const populateSpotsThunk = () => async (dispatch) => {
      const response = await fetch( "/api/spots", { method: 'GET', } )
      const list = await response.json();
      console.log("----------------list------------",list)
            dispatch( populateSpots( list ) );
      return response;
}

export const getSpotThunk = (spotId) => async ( dispatch ) => {
      const response = await fetch( `/api/spots/${ spotId }` )
      if ( response.ok ) {
            const spot = await response.json()
            // console.log("-----------thunk spot repsonse-----------", spot)
            dispatch( spotDetails( spot ) )
            dispatch(addSpot(spot))
      }
}

export const newSpotThunk = ( spotData ) => async ( dispatch ) => {

      const { address, city, state, country, name, description, price, images } = spotData

      const response = await csrfFetch( '/api/spots', {
            method: 'POST',
            body: JSON.stringify( { address, city, state, country, name, description, price } )
      } )

      if ( response.ok ) {
            const newSpot = await response.json()
            let i = 0;
            const attachImages = [];
             images.map( ( image ) => {
                  if ( i === 0 ) {
                        attachImages[i] = {
                              preview: true,
                              url: image
                        }

                  } else {
                       attachImages[ i ] = {
                              preview: false,
                              url: image
                        }
                  }
                  i++
            } )

            for ( let image of attachImages ) {
                  // console.log(image)
                  const { preview, url } = image
                  // console.log( image, "IMAGE", previewImage, "PRE IMG", url, "URL" )
                  let imageRes = await csrfFetch( `/api/spots/${ newSpot.id }/images`, {
                        method: 'POST',
                        body: JSON.stringify( { preview: preview, url: url } )
                  } )
                  imageRes = await imageRes.json()
            }
            newSpot.previewImage = images[0]
            dispatch( spotDetails( newSpot ) )
            return newSpot
      }
}

export const editSpotThunk = ( spot ) => async dispatch => {

      const { address, city, state, country, name, description, price, spotId } = spot

      const response = await csrfFetch( `/api/spots/${ spotId }`, {
            method: 'PUT',
            body: JSON.stringify( { address, city, state, country,  name, description, price } )
      } )

      const data = await response.json()

      if ( response.ok ) {
            return dispatch( editSpot( data ) )
      }


}

export const deleteSpotThunk = ( spot ) => async dispatch => {
      // console.log( "-------------------------", spot )
      const { id } = spot
      // console.log("-------------------------",id)
      const response = await csrfFetch( `/api/spots/${id}`, {
            method: 'DELETE'
      } )

      if ( response.ok ) {
            const data = await response.json()
            dispatch( deleteSpot( id ) )
      }
}

const initialState = {};
const spotReducer = ( state = initialState, action ) => {
      // console.log( 'action runnin', action.type );
      let newState = { ...state }

      switch ( action.type ) {
            case POPULATE_SPOTS:
                  // newState = {}
                  Object.values( action.payload.Spots ).forEach( spot => newState[ spot.id ] = spot )
                  return newState
            case GET_SPOT:
                  newState[ action.payload.id ] = action.payload
                  return newState
            case ADD_SPOT:
                  newState[ action.payload.id ] = action.payload
                  return newState
            // case ADD_IMAGE:
            //       return newState[ action.payload.id ]['SpotImages'].push(action.payload)
            case UPDATE_SPOT:
                  newState[ action.payload.id ] = action.payload
                  return newState
            case DELETE_SPOT:
                  delete newState[ action.payload]
                  return newState
            default:
                  return newState
      }
}

export default spotReducer;
