import React, { useState } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch} from 'react-redux';
import { useModal } from "../../context/Modal";
import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
        return dispatch( sessionActions.login( { credential, password } ) )
          .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

      return (
            <div id="login-container">
                  <h1>Log In</h1>
    <form onSubmit={handleSubmit}>
                        { errors.length > 0 && ( <div id="error-container">
        {errors.map((error, idx) => <p key={idx}>{error}</p>)}
      </div>)}
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
                              disabled={ !password || !credential}
                        >Log In</button>
                  </form>
                  </div>
  );
}

export default LoginFormModal;
