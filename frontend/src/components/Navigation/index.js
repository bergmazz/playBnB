import React from 'react';
import {  useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { useDispatch } from "react-redux";
import ProfileButton from './ProfileButton';
// import * as spotActions from '../../store/spots';
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
      const sessionUser = useSelector( state => state.session.user );
      const history = useHistory();
      //   const dispatch = useDispatch();
const handleHomeClick = () => {
            // dispatch( spotActions.populateSpotsThunk() );
            history.push( '/' ); // use history.push to navigate to home page
      };


  let sessionLinks;
  if (sessionUser) {
        sessionLinks = (
              <div className="nav_session_links">
                    <ProfileButton user={ sessionUser } />
                    {/* <OpenModalButton
                          buttonText="Create a new spot"
                          modalComponent={ <LoginFormModal /> }
                    /> */}
              </div>

    );
  } else {
        sessionLinks = (
              <div className= "nav_session_links">
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
          <OpenModalButton
          buttonText="Sign Up"
                      modalComponent={ <SignupFormModal /> }
                />
      </div>
    );
  }

      return (
            <nav className='navbar'>

                  <div onClick={ handleHomeClick } className="nav_home_icon"  style={ { color: "#461f51", } } >
                              <i className="fa-solid fa-child-reaching" >play b n b</i>
                  </div>

      {isLoaded && sessionLinks}

</nav>
  );
}

export default Navigation;
