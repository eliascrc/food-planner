import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import './Landing.scss';

class Landing extends Component {

  constructor(props) {
    super(props);

    this.state = {
      goToFood: false,
      goToWater: false,
    }
  }

  handleCardClick = (e, cardClicked) => {
    e.preventDefault();

    switch(cardClicked) {
      case 'FOOD':
        this.setState({ goToFood: true });
        break;
      case 'WATER':
        this.setState({ goToWater: true });
        break;
      default:
        break;
    }
  }

  render() {
    const { goToFood, goToWater } = this.state;
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }
    if (goToFood) {
      return <Redirect to="/food" />;
    }
    if (goToWater) {
      return <Redirect to="/water" />;
    }

    return (
      <section className="landing">
        <div className="landing__container">
          <h1 className="landing__heading">What are you planning today?</h1>

          <div className="landing__cards">

            <div onClick={(e) => this.handleCardClick(e, 'FOOD')} className="landing__card landing__card--food">
              <div className="landing__card-icon">
                <i className="fas fa-utensils"></i>
              </div>
              <div className="landing__card-caption">
                Food
              </div>
            </div>

            <div onClick={(e) => this.handleCardClick(e, 'WATER')} className="landing__card landing__card--water">
              <div className="landing__card-icon">
                <i className="fas fa-tint"></i>
              </div>
              <div className="landing__card-caption">
                Water
              </div>
            </div>

          </div>
        </div>
      </section>
    )
  }
}
export default Landing;
