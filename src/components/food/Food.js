import React, { Component } from 'react';
import { Switch, Route, withRouter, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import './Food.scss';
import Calendar from '../calendar/Calendar';
import AddFood from '../add-food/AddFood';
import { addMeal, deleteMeal, editMeal, resetCalendar } from '../../redux/actions';
import EditFood from '../edit-food/EditFood';
import { formatDateDMY } from '../../utils/commons';
import { createEvent } from '../../utils/api-calendar-lib';

class Food extends Component {

  constructor(props) {
    super(props);

    this.state = {
      selectedDate: 0,
    }
  }

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

  handleAlarmClick = (e, dayIndex, typeIndex) => {
    e.preventDefault();

    const { meals, daysInfo, onAddMeal, ApiCalendar, enableGoogle } = this.props;
    const selectedMeal = meals[typeIndex][dayIndex];

    if (!selectedMeal.alarmSet && enableGoogle) {
      createEvent(ApiCalendar, selectedMeal, typeIndex, dayIndex, daysInfo,
        (result) => {
          const newMeal = { ...selectedMeal };
          newMeal.alarmSet = true;
          onAddMeal(selectedMeal, dayIndex, typeIndex);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  handleSelectDate(e, index) {
    e.preventDefault();

    this.setState({ selectedDate: index });
  }

  render() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn) {
      return <Redirect to="/login" />;
    }

    const { enableGoogle, daysInfo, onAddMeal, onEditMeal, onResetMeals, meals } = this.props;
    const { selectedDate } = this.state;

    return (
      <section className="food">
        <div className="food__container">

          <div className="food__column">
            <h1 className="food__heading">Food</h1>

            <nav className="food__navbar">
              <ul className="food__nav-items">
                <li className="food__nav-item">
                  <Link className="food__nav-link" to="/food" >Calendar</Link>
                </li>
                <li className="food__nav-item">
                  <Link className="food__nav-link" to="/food/add" >Add Food</Link>
                </li>
                <li className="food__nav-item">
                  <button className="food__nav-reset" onClick={onResetMeals}>Reset Meals</button>
                </li>
              </ul>
            </nav>

            <div className="food__dates">
              {daysInfo.map( (day, index) =>
                <button className={`food__date ${selectedDate === index? "food__selected-date" : ""}`}
                  onClick={(e) => this.handleSelectDate(e, index)}>
                  {formatDateDMY(day)}
                </button>
              )}
            </div>

          </div>

          <div className="food__column">
            <Switch >
              <Route exact path="/food/" render={(props) =>
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
              <Route exact path="/food/add" render={(props) =>
                <AddFood
                  {...props}
                  daysInfo={daysInfo}
                  onAddMeal={onAddMeal} />
              }
              />
              <Route exact path="/food/edit/:type/:dayIndex" render={(props) =>
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

const mapStateToProps = state => ({
  daysInfo: state.daysInfo,
  meals: state.meals,
  mealTypes: state.mealTypes
});

const mapDispatchToProps = dispatch => ({
  onAddMeal: (newCalendarItem, daySelected, typeSelected) =>
    dispatch(addMeal(newCalendarItem, daySelected, typeSelected)),
  onDeleteMeal: (dayIndex, typeIndex) => dispatch(deleteMeal(dayIndex, typeIndex)),
  onEditMeal: (updatedCalendarItem, daySelected, typeSelected) =>
    dispatch(editMeal(updatedCalendarItem, daySelected, typeSelected)),
  onResetMeals: () => dispatch(resetCalendar()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(Food)
);