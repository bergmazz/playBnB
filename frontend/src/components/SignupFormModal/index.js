import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormModal () {
      const dispatch = useDispatch();
      const [ email, setEmail ] = useState( "" );
      const [ username, setUsername ] = useState( "" );
      const [ firstName, setFirstName ] = useState( "" );
      const [ lastName, setLastName ] = useState( "" );
      const [ password, setPassword ] = useState( "" );
      const [ confirmPassword, setConfirmPassword ] = useState( "" );
      const [ errors, setErrors ] = useState([]);
      const [ submitted, setSubmitted ] = useState( false );
      const { closeModal } = useModal();

      const handleSubmit =  ( e ) => {
            e.preventDefault();

            if ( password === confirmPassword ) {
                 return dispatch(
                        sessionActions.signup( { email, username, firstName, lastName, password } )
                  )
                        .then( closeModal )
            .catch( async ( res ) => {
                  const data = await res.json();
                  console.log("----------------", data)
                  if ( data && data.message )
                        // if ( data.message === "Validation error" ) {
                              setErrors(Object.values(data.errors))
                        // } else {
                        //        setErrors( [ data.message ] );
                        // }
            } );
            }
            else{
               setErrors( [ 'Confirm Password field must be the same as the Password field' ] );
            }
      };

      const isSignupDisabled =
            !email ||
            !username ||
            !firstName ||
            password.length < 6 ||
            username.length < 4 ||
            !lastName ||
            !password ||
            !confirmPassword;


      return (
            <div id="signup-container">

                  <h1>Sign Up</h1>

                  <form onSubmit={ handleSubmit }>

                              <div id="error-container">
                                    { Object.values(errors).map( ( error ) => (
                                          <p key={ error }>{ error }</p>
                                    ) ) }
                              </div>

                        <label >
                              <input
                                    className="text-field-signup"
                                    placeholder="Email"
                                    type="text"
                                    value={ email }
                                    onChange={ ( e ) => setEmail( e.target.value ) }
                                    required
                              />
                        </label>

                        <label>
                              <input
                                    className="text-field-signup"
                                    placeholder="Username"
                                    type="text"
                                    value={ username }
                                    onChange={ ( e ) => setUsername( e.target.value ) }
                                    required
                              />
                        </label>

                        <label>
                              <input
                                    className="text-field-signup"
                                    placeholder="First Name"
                                    type="text"
                                    value={ firstName }
                                    onChange={ ( e ) => setFirstName( e.target.value ) }
                                    required
                              />
                        </label>

                        <label>
                              <input
                                    className="text-field-signup"
                                    placeholder="Last Name"
                                    type="text"
                                    value={ lastName }
                                    onChange={ ( e ) => setLastName( e.target.value ) }
                                    required
                              />
                        </label>

                        <label>
                              <input
                                    className="text-field-signup"
                                    placeholder="Password"
                                    type="password"
                                    value={ password }
                                    onChange={ ( e ) => setPassword( e.target.value ) }
                                    required
                              />
                        </label>

                        <label>
                              <input
                                    className="text-field-signup"
                                    placeholder="Confirm Password"
                                    type="password"
                                    value={ confirmPassword }
                                    onChange={ ( e ) => setConfirmPassword( e.target.value ) }
                                    required
                              />
                        </label>

                        <button type="submit"
                              className="button-class-signup"
                              disabled={ isSignupDisabled }
                        >
                              Sign Up
                        </button>

                  </form>
            </div>
      );
}

export default SignupFormModal;
