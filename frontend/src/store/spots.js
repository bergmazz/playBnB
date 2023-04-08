import { csrfFetch } from './csrf';

const POPULATE_SPOTS = 'spots/POPULATE_SPOTS';
const GET_SPOT = 'spots/GET_SPOT';
// const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const ADD_SPOT = 'spots/ADD_SPOT'
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
      }
}

export const newSpotThunk = ( spotData ) => async ( dispatch ) => {


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
                  newState = {}
                  Object.values( action.payload.Spots ).forEach( spot => newState[ spot.id ] = spot )
                  return newState
            case GET_SPOT:
                  newState[ action.payload.id ] = action.payload
                  // if ( newState[ undefined ] ) {
                  //       delete newState[ 'undefined' ]
                  // }
                  return newState[ action.payload.id ]
            default:
                  return newState
      }
}

export default spotReducer;
