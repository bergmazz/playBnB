import React, { useState, useEffect, useRef } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";
import * as sessionActions from '../../store/session';
import "./profile.css"

function ProfileButton ( { user } ) {
      const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [ showMenu ] );


  const logout = (e) => {
        e.preventDefault();
              history.push( '/' ); // use history.push to navigate to home page
    dispatch(sessionActions.logout());
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <div className="profile-button-container">
              <button className="profile-button" onClick={ openMenu } style={ { color: "#461f51", } }  >
                    <i className="fa-solid fa-bars"> <i className= " fa-solid fa-person-breastfeeding"/> </i>
      </button>
              <ul className={ ulClassName } ref={ ulRef }>
                    <li className="menu-item">Hello, { user.firstName }!</li>
                    <li className="menu-item">{ user.email }</li>
                 <li className="current"><NavLink to="/spots/current">Manage your spots</NavLink></li>
                    <li className="button-mom">
                          <button onClick={ logout } className="logout-button">Log Out</button>
                    </li>
      </ul>
    </div>
  );
}

export default ProfileButton;
