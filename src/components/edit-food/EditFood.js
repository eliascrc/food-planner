import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import TimeField from 'react-simple-timefield';

import './EditFood.scss';

export default class EditFood extends Component {

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
      done: false,
      alarmSet: false,
      goToCalendar: false,
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { daySelected, typeSelected, description, time, done, alarmSet } = this.state;
    const { onEditMeal } = this.props;
    const updatedCalendarItem = {
      description,
      done,
      alarmSet,
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
        description, done, alarmSet, time,
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
      <form onSubmit={this.handleSubmit}>
        <h2>Edit Food</h2>

        <label>
          Description:
          <textarea value={description} onChange={(e) => this.handleChange(e, 'DESCRIPTION')} />
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
