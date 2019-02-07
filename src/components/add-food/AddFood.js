import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import TimeField from 'react-simple-timefield';

import { formatDateDMY } from '../../utils/commons';
import './AddFood.scss';

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
      time: '',
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

    switch(key) {
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
      <form onSubmit={this.handleSubmit}>
        <h2>Add Food</h2>

        <label>
          Day:
          <select value={daySelected} onChange={(e) => this.handleChange(e, 'DATE')}>
            {daysInfo.map((day, index) => (
              <option value={index} key={index}>{formatDateDMY(day)}</option>
            ))}
          </select>
        </label>

        <label>
          Type:
          <select value={typeSelected} onChange={(e) => this.handleChange(e, 'TYPE')}>
            {availableTypes.map((type, index) => (
              <option value={index} key={index}>{type}</option>
            ))}
          </select>
        </label>

        <label>
          Description:
          <textarea value={description} onChange={(e) => this.handleChange(e, 'DESCRIPTION')}/>
        </label>

        <label>
          Time:
          <TimeField
            value={time}
            onChange={(value) => this.handleChange(value, 'TIME')}
          />
        </label>

        <button>Submit</button>
      </form>
    )
  }
}
