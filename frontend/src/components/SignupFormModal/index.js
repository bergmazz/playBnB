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
      const [ errors, setErrors ] = useState( [] );
      const { closeModal } = useModal();

      const handleSubmit = async ( e ) => {
            e.preventDefault();

            if ( password === confirmPassword ) {
                  setErrors( [] );
                  const response = await dispatch(
                        sessionActions.signup( { email, username, firstName, lastName, password } )
                  );
                  if ( response.ok ) {
                        closeModal();
                  } else {
                        const data = await response.json();
                        if ( data.errors ) {
                              console.log("-----------errors----------", data.errors)
                             return  setErrors( data.errors );
                        }
                  }
            } else {
                  return setErrors( [ 'Confirm Password field must be the same as the Password field' ] );
            }
      };

      const isSignupDisabled =
            !email ||
            !username ||
            !firstName ||
            !lastName ||
            !password ||
            !confirmPassword;

      const containerRef = useRef( null );

      useEffect( () => {
            if ( containerRef.current ) {
                  containerRef.current.style.height = `${ containerRef.current.scrollHeight }px`;
            }
      }, [ errors ] );


      return (
            <div id="signup-container">

                  <h1>Sign Up</h1>

                  <form onSubmit={ handleSubmit }>

                        { errors.length > 0 && (
                              <div id="error-container">
                                    { errors.map( ( error ) => (
                                          <p key={ error }>{ error }</p>
                                    ) ) }
                                    {/* { errors.map( ( error, idx ) => <p key={ idx }>{ error }</p> ) } */}
                              </div>
                        ) }

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
