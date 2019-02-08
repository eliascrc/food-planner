import React, { Component } from 'react';

import './CalendarItem.scss';
import { Link } from 'react-router-dom';
import { MEAL_TYPES } from '../../utils/constants';

export default class CalendarItem extends Component {

  /**
   * Returns a different JSX component depending if the meal is marked as done.
   */
  getCalendarItem = () => {
    const { description, alarmSet, done, time, dayIndex, 
      typeIndex, enableGoogle, handleDoneClick, handleDeleteClick, handleAlarmClick } = this.props;
    
    const editPath = `/food/edit/${typeIndex}/${dayIndex}`;

    return (
      <div className="calendar-item__container">
        {done ?
          <div className="calendar-item__wrapper">
            <p className="calendar-item__title">Yummy!</p>
            <button
              onClick={(e) => handleDoneClick(e, dayIndex, typeIndex)}
              className="calendar-item__button">
              <i className="fas fa-undo-alt"></i>
            </button>
          </div>
          :
          <div className="calendar-item__wrapper">

            <p className="calendar-item__title">{MEAL_TYPES[typeIndex]}</p>
            <p className="calendar-item__description">You'll be eating: {description}</p>
            <p className="calendar-item__time">At <strong>{time}</strong></p>

            <button
              onClick={(e) => handleDoneClick(e, dayIndex, typeIndex)}
              className="calendar-item__button">
              <i className="fas fa-check"></i>
            </button>

            <Link to={editPath}>
              <button className="calendar-item__button">
                <i className="fas fa-pen"></i>
              </button>
            </Link>

            <button 
              onClick={(e) => handleDeleteClick(e, dayIndex, typeIndex)}
              className="calendar-item__button">
              <i className="fas fa-trash"></i>
            </button>
            
            <button
              disabled={!enableGoogle}
              onClick={(e) => handleAlarmClick(e, dayIndex, typeIndex)}
              className={`calendar-item__button ${alarmSet ? 'calendar-item__button--alarmSet' : null}`}>
              <i className="fas fa-bell"></i>
            </button>
          </div>
        }
      </div>
    );
  }

  render() {

    return (
      <div className="calendar-item">
        {this.getCalendarItem()}
      </div>
    );
  }
}
