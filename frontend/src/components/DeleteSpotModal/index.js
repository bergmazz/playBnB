import React from "react";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import './delete.css'

function DeleteSpotModal ( {spot}) {
      const dispatch = useDispatch();
      const { closeModal } = useModal();
      let user = useSelector( ( state ) => state.session )

      const handleSubmit = ( e ) => {
            e.preventDefault();
            return dispatch( spotActions.deleteSpotThunk( spot ) )
                  .then( closeModal )
                  .catch(
            );
      };

      return (
            <div className="delete-container">
                  <h1>Confirm Delete</h1>
                  <h3>Are you sure you want to remove this spot from the listings?</h3>
                  <button type='submit' onClick={ handleSubmit } className='yuss'>Yes (Delete Spot)</button>
                  <button onClick={ closeModal } className='nuhh'>No (Keep Spot)</button>
            </div>
      );
}

export default DeleteSpotModal;
