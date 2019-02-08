import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import ApiCalendar from 'react-google-calendar-api';
import PropTypes from 'prop-types';

import './App.scss';
import Header from './components/header/Header';
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Food from './components/food/Food';
import Water from './components/water/Water';
import { newLogin, logout, updateCup, restartWater } from './redux/actions';
import { GAPI_KEY, PRIMARY_CALENDAR, ROOT_PATH, LOGIN_PATH, WATER_PATH, FOOD_PATH } from './utils/constants';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gapi: null, // Stores the Google Api in a variable for further reference
      enableGoogle: false, // Flag that indicates: true if Gapi is ready to use, false if not.
    }
  }

  handleLogout = (e) => {
    e.preventDefault();
    ApiCalendar.handleSignoutClick();
  }

  handleSignIn = (e) => {
    e.preventDefault();
    ApiCalendar.handleAuthClick();
  }

  /**
   * Toggles the flag for a cup of water and saves it to redux
   */
  handleCupClick = (e, index) => {
    e.preventDefault();

    const { water, onUpdateCup } = this.props;
    onUpdateCup(!water.cupsDrank[index], index);
  }

  handleRestartWater= (e) => {
    e.preventDefault();

    const { onRestartWater } = this.props;
    onRestartWater();
  }

  componentDidMount() {
    const { onNewLogin, onLogout, isLoggedIn } = this.props;

    ApiCalendar.onLoad(() => { // When Gapi has loaded
      const gapi = window[GAPI_KEY
      ];
      ApiCalendar.setCalendar(PRIMARY_CALENDAR); // Sets the calendar to the user's primary one

      ApiCalendar.listenSign((sign) => { // sign, true if signed in, false if signed out.
        if (sign) {
          const authInstance = gapi.auth2.getAuthInstance();
          const username = authInstance.currentUser.Ab.w3.U3;
          const name = authInstance.currentUser.Ab.w3.ig;
          onNewLogin(username, name);
        } else {
          onLogout();
        }
      })

      if (!gapi.auth2.getAuthInstance().isSignedIn && isLoggedIn) {
        onLogout();
      }

      this.setState({ gapi, enableGoogle: true });
    })
  }

  render() {
    const { enableGoogle } = this.state;
    const { name, isLoggedIn, water } = this.props;

    return (
      <div>
        {isLoggedIn ? // If the user is not logged in, don't show the Header
          <Header
            user={name}
            enableAuth={enableGoogle}
            handleLogout={this.handleLogout}
          /> : null
        }

        <main>
          <Switch>
            <Route exact path={ROOT_PATH} render={
              (props) =>
                <Landing
                  {...props}
                  isLoggedIn={isLoggedIn}
                />
            } />
            <Route exact path={LOGIN_PATH} render={
              (props) =>
                <Login
                  {...props}
                  enableAuth={enableGoogle}
                  handleSignIn={this.handleSignIn}
                  isLoggedIn={isLoggedIn}
                />
            } />
            <Route exact path={WATER_PATH} render={
              (props) =>
                <Water
                  {...props}
                  enableGoogle={enableGoogle}
                  isLoggedIn={isLoggedIn}
                  water={water}
                  handleCupClick={this.handleCupClick}
                  handleRestartWater={this.handleRestartWater}
                  ApiCalendar={ApiCalendar}
                />
            } />
            <Route path={FOOD_PATH} render={
              (props) =>
                <Food
                  {...props}
                  enableGoogle={enableGoogle}
                  isLoggedIn={isLoggedIn}
                  ApiCalendar={ApiCalendar}
                />
            } />
          </Switch>
        </main>

      </div>
    );
  }
}

App.propTypes = {
  name: PropTypes.string.isRequired,
  water: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  onNewLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  onUpdateCup: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  name: state.name,
  water: state.water,
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  onNewLogin: (username, name) => dispatch(newLogin(username, name)),
  onLogout: () => dispatch(logout()),
  onUpdateCup: (updatedCup, index) => dispatch(updateCup(updatedCup, index)),
  onRestartWater: () => dispatch(restartWater()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(App)
);
