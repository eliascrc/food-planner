import { NEW_LOGIN, LOGOUT, ADD_MEAL, DELETE_MEAL, EDIT_MEAL, RESET_CALENDAR, UPDATE_CUP } from './actions';
import { getDaysOfTheWeek, getParsedDayJS } from '../utils/commons';
import INITIAL_STATE from './initial-state.json';

function updateLocalStorage(state) {
  localStorage.setItem('state', JSON.stringify(state));
}

function getLocalStorage() {
  return JSON.parse(localStorage.getItem('state'));
}

export function reducer(state = INITIAL_STATE, action) {
  let newState;
  let localState;
  let newMeals;

  switch (action.type) {
    case NEW_LOGIN:
      if (state.username === action.username) {
        newState = { ...state, isLoggedIn: true };
      } else {
        newState = { ...INITIAL_STATE, isLoggedIn: true, name: action.name, username: action.username, daysInfo: getDaysOfTheWeek() }
      }

      updateLocalStorage(newState);
      return newState;

    case LOGOUT:
      newState = { ...state, isLoggedIn: false };
      updateLocalStorage(newState);
      
      return newState;

    case ADD_MEAL:
    debugger
      newMeals = [...state.meals];
      newMeals[action.typeSelected][action.daySelected] = action.newMeal;
      newState = { ...state, meals: newMeals };
      updateLocalStorage(newState);

      return newState;

    case DELETE_MEAL:
      newMeals = [...state.meals];
      newMeals[action.typeSelected][action.daySelected] = null;
      newState = { ...state, meals: newMeals };
      updateLocalStorage(newState);

      return newState;

    case EDIT_MEAL:
      newMeals = [...state.meals];
      newMeals[action.typeSelected][action.daySelected] = action.updatedMeal;
      newState = { ...state, meals: newMeals };
      updateLocalStorage(newState);

      return newState;

    case RESET_CALENDAR:
      newMeals = [...state.meals];
      for (let index = 0; index < newMeals.length; index++) {
        newMeals[index] = [null, null, null, null, null, null, null];
      }
      newState = { ...state, meals: newMeals, daysInfo: getDaysOfTheWeek() };
      updateLocalStorage(newState);

      return newState;

    case UPDATE_CUP:
    debugger
      let newWater = { ...state.water }; 
      let newCupsDrank = [...state.water.cupsDrank];
      newCupsDrank[action.index] = action.updatedCup;
      newWater.cupsDrank = newCupsDrank;
      newState = { ...state, water: newWater };
      updateLocalStorage(newState);

      return newState;

    default:
      localState = getLocalStorage();
      if (localState !== null) {
        for (let index = 0; index < localState.daysInfo.length; index++) {
          localState.daysInfo[index] = getParsedDayJS(localState.daysInfo[index]);
        }

        newState = { ...localState };
      } else {
        newState = { ...state };
      }

      return { ...newState };
  }
}