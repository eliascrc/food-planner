import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Header.scss';
import PrimaryButton from '../primary-button/PrimaryButton';

const Header = ({ user, enableAuth, handleLogout }) => (
  <header className="header">

    <div className="header__container">
      <div className="header__column">
        <p className="header__user-info">Welcome, <i>{user}!</i></p>
      </div>

      <div className="header__column">
        <Link to="/" className="header__brand">
          <i className="header__icon-rotated fab fa-pagelines"></i>
          &nbsp;Healthy Habs&nbsp;
          <i className="fab fa-pagelines"></i>
        </Link>
      </div>

      <div className="header__column">
        <div className="header__logout">
          <PrimaryButton
            text="Logout"
            disabled={!enableAuth}
            handleClick={handleLogout}
          />
        </div>
      </div>
    </div>

  </header>
);

Header.propTypes = {
  user: PropTypes.string.isRequired,
  enableAuth: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default Header;