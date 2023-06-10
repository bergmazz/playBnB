import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import * as sessionActions from "./store/session";
import * as spotActions from "./store/spots";
import Navigation from "./components/Navigation";
import LandingPage from "./components/Landing";
import SpotDetails from "./components/SpotDetails";
import CurrentUserSpots from "./components/CurrentUserSpots";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(sessionActions.restoreUser());
      dispatch(spotActions.populateSpotsThunk());
    };
    fetchData().then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      {isLoaded && <Navigation isLoaded={isLoaded} />}
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            {" "}
            <LandingPage isLoaded={isLoaded} />
          </Route>
          <Route exact path="/spots">
            {" "}
            <LandingPage isLoaded={isLoaded} />
          </Route>
          <Route path={`/spots/current`}>
            <CurrentUserSpots />{" "}
          </Route>
          <Route path={`/spots/:id`}>
            <SpotDetails />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
