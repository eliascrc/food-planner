import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import TimeField from 'react-simple-timefield';

import './EditFood.scss';
import PrimaryButton from '../primary-button/PrimaryButton';
import { isStringEmpty } from '../../utils/commons';

export default class EditFood extends Component {

  constructor(props) {
    super(props);

    this.state = {
      daySelected: 0,
      typeSelected: 0,
      description: '',
      time: '',
      prevTime: '',
      done: false,
      alarmSet: false,
      goToCalendar: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { daySelected, typeSelected, description, time, prevTime, done, alarmSet } = this.state;
    const { onEditMeal } = this.props;
    const updatedCalendarItem = {
      description,
      done,
      alarmSet: (prevTime === time)? alarmSet : false,
      time,
    }

    onEditMeal(updatedCalendarItem, daySelected, typeSelected);
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

  componentDidMount() {
    try {
      const { meals, match } = this.props;
      const { params } = match;
      const { description, done, alarmSet, time } = meals[params.type][params.dayIndex];
      this.setState({
        description, done, alarmSet, time, prevTime: time,
        typeSelected: params.type, daySelected: params.dayIndex
      });
    } catch (err) {
      this.setState({ goToCalendar: true });
    }
  }

  render() {
    const { description, time, goToCalendar } = this.state;

    if (goToCalendar) {
      return <Redirect to="/food" />;
    }

    return (
      <form className="edit-food" onSubmit={this.handleSubmit}>
        <h2 className="edit-food__heading">Edit Food</h2>
        <hr className="edit-food__separator" />

        <label>
          <p className="edit-food__label">Description:</p>
          <textarea
            className="edit-food__input edit-food__input--text-area"
            value={description}
            onChange={(e) => this.handleChange(e, 'DESCRIPTION')} />
        </label>

        <label>
          <p className="edit-food__label">Time:</p>
          <div className="edit-food__input--time">
            <TimeField
              value={time}
              onChange={(value) => this.handleChange(value, 'TIME')}
            />
          </div>
        </label>

        <PrimaryButton 
          disabled={isStringEmpty(description)}
          handleClick={() => {}}
          text="Submit"
        />
      </form>
    )
  }
}
