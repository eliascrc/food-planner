import React, { Component } from 'react';
import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import uuid from 'uuid';
import PropTypes from 'prop-types';

import './Food.scss';
import Calendar from '../calendar/Calendar';
import AddFood from '../add-food/AddFood';
import EditFood from '../edit-food/EditFood';
import { addMeal, deleteMeal, editMeal, resetCalendar, logout } from '../../redux/actions';
import { formatDateDMY } from '../../utils/commons';
import { createEvent } from '../../utils/api-calendar-lib';
import { LOGIN_PATH, DEFAULT_ALARM_ERROR_MSG, FOOD_PATH, FOOD_ADD_PATH, FOOD_EDIT_PATH } from '../../utils/constants';

class Food extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: 0,
      alarmError: null,
    }
  }

  /** 
   * Toggles the Done flag of a selected meal and saves it to redux
   */
  handleDoneClick = (e, dayIndex, typeIndex) => {
    e.preventDefault();

    const { meals, onAddMeal } = this.props;
    const selectedMeal = meals[typeIndex][dayIndex];
    const newMeal = { ...selectedMeal };
    newMeal.done = !newMeal.done;
    onAddMeal(newMeal, dayIndex, typeIndex);
  }

  handleDeleteClick = (e, dayIndex, typeIndex) => {
    e.preventDefault();

    const { onDeleteMeal } = this.props;
    onDeleteMeal(dayIndex, typeIndex);
  }

  /**
   * If the alarm wasn't previously set and Gapi is enabled, it tries to create an Event in
   * Google Calendar and stores the updated meal in redux. 
   * If success, nothing happens. 
   * If there was an error, it undoes the changes in redux. 
   * If 401, it logs the user out. 
   * If unknown error, it shows an error message.
   */
  handleAlarmClick = (e, dayIndex, typeIndex) => {
    e.preventDefault();

    const { meals, daysInfo, onAddMeal, ApiCalendar, enableGoogle, onLogout } = this.props;
    const selectedMeal = meals[typeIndex][dayIndex];

    if (!selectedMeal.alarmSet && enableGoogle) {
      const newMeal = { ...selectedMeal };

      createEvent(ApiCalendar, selectedMeal, typeIndex, dayIndex, daysInfo,
        () => { },
        (error) => {
          newMeal.alarmSet = false;
          onAddMeal(newMeal, dayIndex, typeIndex); // undoes the changes in redux. 

          if (error.code === 401) {
            onLogout();
          } else {
            this.setState({ alarmError: { DEFAULT_ALARM_ERROR_MSG } });
          }
        }
      );

      newMeal.alarmSet = true;
      onAddMeal(newMeal, dayIndex, typeIndex);
    }
  }

  handleSelectDate(e, index) {
    e.preventDefault();
    this.setState({ selectedDate: index });
  }

  render() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to={LOGIN_PATH} />;
    }

    const { enableGoogle, daysInfo, onAddMeal, onEditMeal, onResetMeals, meals } = this.props;
    const { selectedDate, alarmError } = this.state;

    return (
      <section className="food">
        <div className="food__container">

          <div className="food__column">
            <h1 className="food__heading">Food</h1>
            <p className="food__alarm-error">{alarmError}</p>

            <nav className="food__navbar">
              <ul className="food__nav-items">
                <li className="food__nav-item">
                  <Link className="food__nav-link" to="/food" >Calendar</Link>
                </li>
                <li className="food__nav-item">
                  <Link className="food__nav-link" to="/food/add" >Add Food</Link>
                </li>
                <li className="food__nav-item">
                  <button className="food__nav-reset" onClick={onResetMeals}>Restart Week</button>
                </li>
              </ul>
            </nav>

            <div className="food__dates">
              {daysInfo.map((day, index) =>
                <button
                  className={`food__date ${selectedDate === index ? "food__selected-date" : ""}`}
                  onClick={(e) => this.handleSelectDate(e, index)}
                  key={uuid()}>
                  {formatDateDMY(day)}
                </button>
              )}
            </div>

          </div>

          <div className="food__column">
            <Switch >
              <Route exact path={FOOD_PATH} render={(props) =>
                <Calendar
                  {...props}
                  enableGoogle={enableGoogle}
                  selectedDate={selectedDate}
                  handleDoneClick={this.handleDoneClick}
                  handleDeleteClick={this.handleDeleteClick}
                  handleAlarmClick={this.handleAlarmClick}
                />
              }
              />
              <Route exact path={FOOD_ADD_PATH} render={(props) =>
                <AddFood
                  {...props}
                  daysInfo={daysInfo}
                  onAddMeal={onAddMeal} />
              }
              />
              <Route exact path={FOOD_EDIT_PATH} render={(props) =>
                <EditFood
                  {...props}
                  meals={meals}
                  onEditMeal={onEditMeal} />
              }
              />
            </Switch>
          </div>

        </div>
      </section>
    )
  }
}

Food.propTypes = {
  enableGoogle: PropTypes.bool.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  ApiCalendar: PropTypes.object.isRequired,
  daysInfo: PropTypes.array.isRequired, 
  meals: PropTypes.array.isRequired,
  onAddMeal: PropTypes.func.isRequired, 
  onEditMeal: PropTypes.func.isRequired, 
  onResetMeals: PropTypes.func.isRequired, 
}

const mapStateToProps = state => ({
  daysInfo: state.daysInfo,
  meals: state.meals  
});

const mapDispatchToProps = dispatch => ({
  onAddMeal: (newCalendarItem, daySelected, typeSelected) =>
    dispatch(addMeal(newCalendarItem, daySelected, typeSelected)),
  onDeleteMeal: (dayIndex, typeIndex) => dispatch(deleteMeal(dayIndex, typeIndex)),
  onEditMeal: (updatedCalendarItem, daySelected, typeSelected) =>
    dispatch(editMeal(updatedCalendarItem, daySelected, typeSelected)),
  onResetMeals: () => dispatch(resetCalendar()),
  onLogout: () => dispatch(logout()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(Food)
);