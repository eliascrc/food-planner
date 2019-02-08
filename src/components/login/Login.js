import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Login.scss';

const Login = ({ enableAuth, handleSignIn, isLoggedIn }) => {

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login">

      <div className="login__wrapper login__wrapper--green">
        <div className="login__brand">
          <i className="login__brand-icon--rotated fab fa-pagelines"></i>
          &nbsp;Healthy Habs&nbsp;
          <i className="fab fa-pagelines"></i>
        </div>
      </div>

      <div className="login__wrapper">
        <h1 className="login__heading">Login</h1>
        <hr className="login__separator" />
        <p className="login__welcome">In order to plan your foods you need to log with your Google Account</p>
        <button
          className="login__button"
          disabled={!enableAuth}
          onClick={(e) => handleSignIn(e)}>
          <i className="login__google-icon fab fa-google"></i> Login with Google
          </button>
      </div>
    </div>
  )
}

Login.propTypes = {
  enableAuth: PropTypes.bool.isRequired,
  handleSignIn: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};

export default Login;
