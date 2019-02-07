import React, { Component } from 'react'
import { connect } from 'react-redux';

import CalendarItem from '../calendar-item/CalendarItem';
import './Calendar.scss';

class Calendar extends Component {

  getColumnForDay = (dayIndex) => {
    const { meals, mealTypes, enableGoogle, handleDoneClick, handleDeleteClick, handleAlarmClick } = this.props;
    const calendarItemsList = [];

    for (let index = 0; index < meals.length; index++) {
      const mealTime = meals[index];
      const meal = mealTime[dayIndex];

      if (meal) {
        calendarItemsList.push(
          <CalendarItem
            title={mealTypes[index]}
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

const mapStateToProps = state => ({
  daysInfo: state.daysInfo,
  meals: state.meals,
  mealTypes: state.mealTypes
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);