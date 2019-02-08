import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import './Landing.scss';

const Landing = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <Redirect to="/login" />;
  }

  return (
    <section className="landing">
      <div className="landing__container">
        <h1 className="landing__heading">What are you planning today?</h1>

        <div className="landing__cards">

          <Link className="landing__card landing__card--food" to="/food">
            <div className="landing__card-icon">
              <i className="fas fa-utensils"></i>
            </div>
            <div className="landing__card-caption">
              Food
            </div>
          </Link>

          <Link to="/water" className="landing__card landing__card--water">
            <div className="landing__card-icon">
              <i className="fas fa-tint"></i>
            </div>
            <div className="landing__card-caption">
              Water
            </div>
          </Link>

        </div>
      </div>
    </section>
  )
}

Landing.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};


export default Landing;
