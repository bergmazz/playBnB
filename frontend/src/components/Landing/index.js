import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import * as spotActions from "../../store/spots";
import { useDispatch, useSelector } from "react-redux";
import "./landing.css";

const LandingPage = ({ isLoaded }) => {
  const dispatch = useDispatch();
  let spots = {};
  spots = useSelector((state) => Object.values(state.spots));

  useEffect(() => {
    dispatch(spotActions.populateSpotsThunk());
  }, [dispatch]);

  return (
    <div className="spots-container">
      {spots === null || spots === undefined ? (
        <div className="loading">Loading spots...</div>
      ) : (
        isLoaded &&
        spots.map((spot) => (
          <div className="card" key={spot.id}>
            <NavLink to={`/spots/${spot.id}`}>
              <div className="card-crop">
                <div className="img-crop">
                  <img
                    className="img"
                    src={spot.previewImage}
                    alt={spot.description}
                  />
                </div>
                <div className="info-container">
                  <div className="info">
                    {spot.city}, {spot.state}
                  </div>

                  <div className="star">
                    <i className="fa-solid fa-star">
                      {" "}
                      {isNaN(spot.avgRating) ? "New" : spot.avgRating}
                    </i>
                  </div>
                </div>

                <div className="price">${spot.price} night</div>
              </div>
            </NavLink>
          </div>
        ))
      )}
    </div>
  );
};

export default LandingPage;
