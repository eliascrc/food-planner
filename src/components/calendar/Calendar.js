import React, { Component } from 'react'
import { connect } from 'react-redux';

import './Calendar.scss';
import CalendarItem from '../calendar-item/CalendarItem';
import PropTypes from 'prop-types';

class Calendar extends Component {

  /**
   * Creates a column with Breakfast, Lunch and Dinner.
   * 
   * @returns list with the existing meals.
   */
  getColumnForDay = (dayIndex) => {
    const { meals, enableGoogle, handleDoneClick, handleDeleteClick, handleAlarmClick } = this.props;
    const calendarItemsList = [];

    for (let index = 0; index < meals.length; index++) {
      const mealTime = meals[index];
      const meal = mealTime[dayIndex];

      if (meal) { // If the meal exists create a list item
        calendarItemsList.push(
          <CalendarItem
            description={meal.description}
            done={meal.done}
            alarmSet={meal.alarmSet}
            time={meal.time}
            dayIndex={dayIndex}
            typeIndex={index}
            enableGoogle={enableGoogle}
            handleDoneClick={handleDoneClick}
            handleDeleteClick={handleDeleteClick}
            handleAlarmClick={handleAlarmClick}
          />
        );
      }
    }

    return (
      <div className="calendar__column">
        <div className="calendar__items">
          {calendarItemsList}
        </div>
      </div>
    )
  }

  render() {
    const { daysInfo, selectedDate } = this.props;
    const columns = [];
    for (let index = 0; index < daysInfo.length; index++) {
      columns.push(this.getColumnForDay(index))
    }

    return (
      <div className="calendar">
        {columns[selectedDate]}
      </div>
    )
  }
}

Calendar.propTypes = {
  daysInfo: PropTypes.array.isRequired,
  meals: PropTypes.array.isRequired, 
  enableGoogle: PropTypes.bool.isRequired, 
  handleDoneClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired, 
  handleAlarmClick: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  daysInfo: state.daysInfo,
  meals: state.meals
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);