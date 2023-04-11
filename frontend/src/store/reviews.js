import { csrfFetch } from "./csrf";


//acitons
export const GET_REVIEWS = 'reviews/GET_REVIEWS'
export const ADD_REVIEW = 'reviews/ADD_REVIEWS'
export const DELETE_REVIEW = 'review/DELETE_REVIEW'


export const getReviews = ( review ) => {
      return {
            type: GET_REVIEWS,
            review,

      }
}

export const addReview = ( review ) => {
      return {
            type: ADD_REVIEW,
            review
      }
}

export const deleteReview = ( reviewId ) => {
      return {
            type: DELETE_REVIEW,
            reviewId
      }
}

//thunks
export const getReviewsThunk = ( spotId ) => async ( dispatch ) => {
      const response = await fetch( `/api/spots/${ spotId }/reviews` )
      const reviews = await response.json()
      dispatch( getReviews( reviews ) )
}

export const postReviewThunk = ( reviewData ) => async ( dispatch ) => {
      const { review, stars, spotId } = reviewData
      const response = await csrfFetch( `/api/spots/${ spotId }/reviews`, {
            method: 'POST',
            body: JSON.stringify( { review, stars } )
      } )
      if ( response.ok ) {
            const newReview = await response.json()
            dispatch( addReview( newReview ) )
            return newReview
      }
}


export const removeReviewThunk = ( reviewId ) => async ( dispatch ) => {
      const response = await csrfFetch( `/api/reviews/${ reviewId }`, {
            method: 'DELETE'
      } )
      if ( response.ok ) {
            const review = await response.json()
            dispatch( deleteReview( review ) )
            return review
      }
}

const initialState = {}

const reviewReducer = ( state = initialState, action ) => {
      let newState = {}
      switch ( action.type ) {
            case GET_REVIEWS:
                  // console.log( action.review )
                  newState = { ...state, ...action.review }
                  // console.log( newState )
                  return newState
            case ADD_REVIEW:
                  newState = { ...state }
                  newState.Reviews[ action.review?.id ] = action?.review
                  return newState
            case DELETE_REVIEW:
                  newState = { ...state }
                  delete newState[ action.reviewId ]
                  return newState
            default:
                  return state
      }
}


export default reviewReducer
