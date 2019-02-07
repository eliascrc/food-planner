import React, { Component } from 'react';
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import ApiCalendar from 'react-google-calendar-api';

import Header from './components/header/Header';
import Landing from './components/landing/Landing';
import Login from './components/login/Login';
import Food from './components/food/Food';
import Water from './components/water/Water';
import './App.scss';
import { newLogin, logout, updateCup } from './redux/actions';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      gapi: null,
      enableGoogle: false,
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

  handleCupClick = (e, index) => {
    e.preventDefault();

    const { water, onUpdateCup } = this.props;
    onUpdateCup(!water.cupsDrank[index], index);
  }

  componentDidMount() {
    const { onNewLogin, onLogout, isLoggedIn } = this.props;
    ApiCalendar.onLoad(() => {
      const gapi = window['gapi'];

      ApiCalendar.setCalendar('primary');
      ApiCalendar.listenSign((sign) => {
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
        {isLoggedIn ?
          <Header
            user={name}
            enableAuth={enableGoogle}
            handleLogout={this.handleLogout}
          /> : null
        }

        <main>
          <Switch>
            <Route exact path="/" render={(props) => <Landing {...props} isLoggedIn={isLoggedIn} />} />
            <Route exact path="/login" render={
              (props) =>
                <Login
                  {...props}
                  enableAuth={enableGoogle}
                  handleSignIn={this.handleSignIn}
                  isLoggedIn={isLoggedIn}
                />
            } />
            <Route exact path="/water" render={
              (props) => 
                <Water 
                  {...props}
                  enableGoogle={enableGoogle}
                  isLoggedIn={isLoggedIn}
                  water={water}
                  handleCupClick={this.handleCupClick}
                  ApiCalendar={ApiCalendar}
                />
            } />
            <Route path="/food" render={
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

const mapStateToProps = state => ({
  name: state.name,
  water: state.water,
  isLoggedIn: state.isLoggedIn,
});

const mapDispatchToProps = dispatch => ({
  onNewLogin: (username, name) => dispatch(newLogin(username, name)),
  onLogout: () => dispatch(logout()),
  onUpdateCup: (updatedCup, index) => dispatch(updateCup(updatedCup, index)),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(App)
);
