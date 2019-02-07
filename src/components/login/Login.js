import React, { Component } from 'react';
import Redirect from 'react-router-dom/Redirect';

import './Login.scss';

export default class Login extends Component {

  render() {
    const { enableAuth, handleSignIn, isLoggedIn } = this.props;
    if (isLoggedIn) {
      return <Redirect to="/" />;
    }

    return (
      <div className="login">
        <div className="login__wrapper login__wrapper--green">
          <div className="login__brand">
            <i className="header__icon-rotated fab fa-pagelines"></i>
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
}
