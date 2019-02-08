import React, { Component } from 'react';
import { Redirect } from 'react-router';
import TimeField from 'react-simple-timefield';
import uuid from 'uuid';

import './Water.scss';
import { createWaterEvent } from '../../utils/api-calendar-lib';
import PrimaryButton from '../primary-button/PrimaryButton';

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
    const { isLoggedIn, water, handleCupClick, handleRestartWater } = this.props;
    const { time, message } = this.state;
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    return (
      <section className="water">
        <h1 className="water__heading">Water</h1>

        <div className="water__container">
          <div className="water__restart-button">
            <PrimaryButton
              disabled={false}
              handleClick={(e) => handleRestartWater(e)}
              text="Restart the bottles!"
            />
          </div>
          <div className="water__cups">
            {water.cupsDrank.map((cupDrank, index) => (
              <div className="water__cup" key={uuid()}>
                <button
                  className="water__cup-button"
                  onClick={(e) => handleCupClick(e, index)}>
                  {cupDrank ?
                    <img className="water__cup-icon" src={require('../../assets/water-bottle-drank.png')} alt="Water Drank" /> :
                    <img className="water__cup-icon" src={require('../../assets/water-bottle-full.png')} alt="Water Bottle" />}
                </button>
                <p className="water__cup-caption">
                  {cupDrank ? "Nice!" : `Bottle #${index + 1}`}
                </p>
              </div>
            ))}
          </div>

          <form className="water__reminder-form" onSubmit={(e) => this.handleSubmit(e)}>
            <label className="water__reminder-label">
              Remind me to drink water at:
              <div className="water__reminder-input--time">
                <TimeField
                  value={time}
                  onChange={(value) => this.handleTimeChange(value)}
                />
              </div>
            </label>

            <PrimaryButton
              disabled={false}
              onClick={() => { }}
              text="Set an Alarm!"
            />

            <p className="water__reminder-msg">{message}</p>
          </form>

        </div>
      </section>
    )
  }
}
