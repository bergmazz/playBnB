import { csrfFetch } from './csrf';

const POPULATE_SPOTS = 'spots/POPULATE_SPOTS';
const GET_SPOT = 'spots/GET_SPOT';
// const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const ADD_SPOT = 'spots/ADD_SPOT'
// const ADD_IMAGE = 'spots/ADD_IMAGE'
// const DELETE_SPOT = 'spots/DELETE_SPOT';

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

// const addImageToSpot = ( spotId, image ) => {
//       return {
//             type: ADD_IMAGE,
//             payload: { spotId, image }
//       }
// }

export const populateSpotsThunk = () => async (dispatch) => {
      const response = await fetch( "/api/spots", { method: 'GET', } )
      const list = await response.json();
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

const initialState = {
      // spots: { current: {}, all: [] },
      // page: 1,
      // size: 20,
};

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
                  // if ( newState[ undefined ] ) {
                  //       delete newState[ 'undefined' ]
                  // }
                  return newState
                  // return newState[ action.payload.id ]
            case ADD_SPOT:
                  // return newState[ action.payload.id ] = action.payload
                  newState[ action.payload.id ] = action.payload
                  return newState
            // case ADD_IMAGE:
            //       return newState[ action.payload.id ]['SpotImages'].push(action.payload)
            default:
                  return newState
      }
}

export default spotReducer;
