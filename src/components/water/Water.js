import React, { Component } from 'react';
import { Redirect } from 'react-router';
import TimeField from 'react-simple-timefield';

import './Water.scss';
import { createWaterEvent } from '../../utils/api-calendar-lib';

export default class Water extends Component {

  constructor(props) {
    super(props);

    this.state = {
      time: '12:00',
      message: '',
    }
  }

  handleTimeChange = (value) => {
    this.setState({ time: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { ApiCalendar, enableGoogle } = this.props;
    const { time } = this.state;
    console.log(time);
    if (enableGoogle) {
      createWaterEvent(ApiCalendar, time,
        () => {
          this.setState({ message: 'The Alarm has been set!' });
          setTimeout(() => {
            this.setState({ message: '' });
          }, 2000);
        },
        () => {
          this.setState({ message: 'The Alarm failed to be set' });
        }
      );
    }
  }

  render() {
    const { isLoggedIn, water, handleCupClick } = this.props;
    const { time, message } = this.state;
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <section className="water">
        <h1 className="water__heading">Water</h1>

        <div className="water__container">
          {water.cupsDrank.map((cupDrank, index) => (
            <button
              className="water__cup"
              onClick={(e) => handleCupClick(e, index)}>
              {cupDrank ?
                <img className="water__icon" src={require('../../assets/check.svg')} alt="Water Drank" /> :
                <img className="water__icon" src={require('../../assets/water-bottle.svg')} alt="Water Bottle" />}
            </button>
          ))}

          <form onSubmit={(e) => this.handleSubmit(e)}>
            <label>
              Remind me to drink water at:
              <TimeField
                value={time}
                onChange={(value) => this.handleTimeChange(value)}
              />
            </label>

            <button>Set an Alarm</button>
          </form>

          <p>{message}</p>

        </div>
      </section>
    )
  }
}
