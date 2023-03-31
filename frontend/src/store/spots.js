import { csrfFetch } from './csrf';

const POPULATE_SPOTS = 'spots/populateSpots'

const populateSpots = ( spots ) => {
      return {
            type: POPULATE_SPOTS,
            payload: spots
      }
}

export const populateSpotsThunk = () => async (dispatch) => {
      const response = await csrfFetch( "/api/spots", { method: 'GET', } )
      // if ( response.ok ) {
      const list = await response.json();
      // console.log(list)
            dispatch( populateSpots( list ) );
      // }
      return response;
}


const initialState = {};

const spotReducer = ( state = initialState, action ) => {
      console.log( 'action runnin', action.type );

      let newState = {...state}
      switch ( action.type ) {
            case POPULATE_SPOTS:
                  newState.spots = action.payload
                  return { ...newState};
            default:
                  return newState
      }
}

export default spotReducer;
