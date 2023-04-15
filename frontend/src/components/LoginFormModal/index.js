import React, { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch} from 'react-redux';
import { useModal } from "../../context/Modal";
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
      const [ errors, setErrors ] = useState( [] );
      const [ formValid, setFormValid ] = useState( false );
      const { closeModal } = useModal();

      useEffect( () => {
            setFormValid( (password.length >= 6) && (credential.length >= 4) );
      }, [ credential, password ] );


      const handleSubmit = ( e ) => {
            e.preventDefault();
            setErrors( [] );
            return dispatch( sessionActions.login( { credential, password } ) )
                  .then( closeModal )
                  .catch( async ( res ) => {
                        const data = await res.json();
                        // console.log("----------------", data)
                        if ( data && data.message ) setErrors( [data.message] );
                  } );
      };


      const demoUserLogin = ( e ) => {
            e.preventDefault()
            return dispatch( sessionActions.login( {
                  credential: 'Demo-lition',
                  password: 'password'
            } ) ).then( closeModal )

      }

      return (
            <div id="login-container">
                  <h1>Log In</h1>

    <form onSubmit={handleSubmit}>
         <div id="error-container">
                              { errors.map( ( error ) => (
                                    <p key={ errors.indexOf( error ) }>{ error }</p>
                              ) ) }
             </div>

                              <input
                                    className="text-field-login"
                                    placeholder='Username or Email'
          type="text"
          value={credential}
          onChange={(e) => setCredential(e.target.value)}
          required
        />


                              <input
                              className="text-field-login"
                              placeholder='Password'
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

                        <button type="submit"
                              className="button-class-login"
                              disabled={ !formValid}
                        >Log In</button>
                  </form>

                  <button className="demo" onClick={ demoUserLogin }>Demo Login</button>

                  </div>
  );
}

export default LoginFormModal;
