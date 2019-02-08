import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TimeField from 'react-simple-timefield';

import { formatDateDMY, isStringEmpty } from '../../utils/commons';
import './AddFood.scss';
import PrimaryButton from '../primary-button/PrimaryButton';

export default class AddFood extends Component {

  constructor(props) {
    super(props);

    this.state = {
      availableTypes: [
        'Breakfast', 'Lunch', 'Dinner',
      ],
      daySelected: 0,
      typeSelected: 0,
      description: '',
      time: '12:00',
      goToCalendar: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { daySelected, typeSelected, description, time } = this.state;
    const { onAddMeal } = this.props;
    const newCalendarItem = {
      description: description,
      done: false,
      alarmSet: false,
      time: time,
    }

    onAddMeal(newCalendarItem, daySelected, typeSelected);
    this.setState({ goToCalendar: true });
  }

  handleChange = (e, key) => {

    switch (key) {
      case 'DATE':
        this.setState({ daySelected: e.target.value });
        break;
      case 'TYPE':
        this.setState({ typeSelected: e.target.value });
        break;
      case 'DESCRIPTION':
        this.setState({ description: e.target.value });
        break;
      case 'TIME':
        this.setState({ time: e });
        break;
      default:
        break;
    }
  }

  render() {
    const { availableTypes, daySelected, typeSelected, description, time, goToCalendar } = this.state;
    const { daysInfo } = this.props;

    if (goToCalendar) {
      return <Redirect to="/food" />;
    }

    return (
      <form className="add-food" onSubmit={this.handleSubmit}>
        <h2 className="add-food__heading">Add Food</h2>
        <hr className="add-food__separator" />

        <label>
          <p className="add-food__label">Day</p>
          <select className="add-food__input" value={daySelected} onChange={(e) => this.handleChange(e, 'DATE')}>
            {daysInfo.map((day, index) => (
              <option value={index} key={index}>{formatDateDMY(day)}</option>
            ))}
          </select>
        </label>

        <label>
          <p className="add-food__label">Type</p>
          <select className="add-food__input" value={typeSelected} onChange={(e) => this.handleChange(e, 'TYPE')}>
            {availableTypes.map((type, index) => (
              <option value={index} key={index}>{type}</option>
            ))}
          </select>
        </label>

        <label>
          <p className="add-food__label">What are you going to eat?</p>
          <textarea className="add-food__input add-food__input--text-area" value={description} onChange={(e) => this.handleChange(e, 'DESCRIPTION')} />
        </label>

        <label>
          <p className="add-food__label">Time</p>
          <div className="add-food__input--time">
            <TimeField
              value={time}
              onChange={(value) => this.handleChange(value, 'TIME')}
            />
          </div>
        </label>

        <PrimaryButton 
          disabled={isStringEmpty(description)}
          onClick={() => {}}
          text="Submit"
        />
      </form>
    )
  }
}
