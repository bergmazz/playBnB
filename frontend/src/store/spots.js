import { csrfFetch } from './csrf';

const POPULATE_SPOTS = 'spots/POPULATE_SPOTS';

const populateSpots = ( spots ) => {
      return {
            type: POPULATE_SPOTS,
            payload: spots
      }
}

export const populateSpotsThunk = () => async (dispatch) => {
      const response = await csrfFetch( "/api/spots", { method: 'GET', } )
      // const response = await fetch( "/api/spots" )
// console.log(response)
      // if ( response.ok ) {
      const list = await response.json();
      // console.log(list)
            dispatch( populateSpots( list ) );
      // }
      return response;
}

const initialState = {
      spots: {},
      page: 1,
      size: 20
};

const spotReducer = ( state = initialState, action ) => {
      console.log( 'action runnin', action.type );
      let newState = { ...state }

      switch ( action.type ) {
            case POPULATE_SPOTS:
                  newState.spots = action.payload.Spots;
                  newState.page = action.payload.page;
                  newState.size = action.payload.size;
                  return { ...newState};
                  // return { ...state, ...action?.spots };
            default:
                  return newState
      }
}

export default spotReducer;
