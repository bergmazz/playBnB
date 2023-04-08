import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getReviewsThunk } from "../../store/reviews";


const Reviews = ( { spotId } ) => {
      const dispatch = useDispatch()
      let reviews = {}
      reviews = useSelector( state => state?.review?.Reviews )
      // const currentUser = useSelector( ( state ) => state?.session?.user );

      useEffect( () => {
            dispatch( getReviewsThunk( spotId ) )
      }, [ dispatch, spotId ] )
      return (
            <>
                {  reviews.length>0 ?(
              Object.values( reviews ).map( review => (
                        <div key={ review.id } className="rev">
                              <h2>{ review.User.firstName }</h2>
                              <h3>{ review.createdAt && new Date( review.createdAt ).toLocaleDateString( 'en-US', { month: 'long', year: 'numeric' } ) }</h3>
                              <p>{ review.review }</p>
                        </div>
                  ) )
                  ) : ( <div classname="no-reviews"> Be the first to post a review</div>)
}
            </>
      )

}


export default Reviews
