import React, { Component } from 'react';

import './CalendarItem.scss';
import { Link } from 'react-router-dom';

export default class CalendarItem extends Component {

  getCalendarItem = () => {
    const { title, description, alarmSet, done, time, dayIndex, 
      typeIndex, enableGoogle, handleDoneClick, handleDeleteClick, handleAlarmClick } = this.props;
    
    const editPath = `/food/edit/${typeIndex}/${dayIndex}`;

    return (
      <div>
        {done ?
          <div className="calendar-item__wrapper">
            <p className="calendar-item__title"><strong>Done!</strong></p>
            <button
              onClick={(e) => handleDoneClick(e, dayIndex, typeIndex)}
              className="calendar-item__button">
              <i className="fas fa-undo-alt"></i>
            </button>
          </div>
          :
          <div className="calendar-item__wrapper">
            <p className="calendar-item__title"><strong>{title}</strong></p>
            <p className="calendar-item__description">{description}</p>
            <p className="calendar-item__time">At {time}</p>
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
