/* Action Strings constants */
export const NEW_LOGIN = 'NEW_LOGIN';
export const LOGOUT = 'LOGOUT';
export const ADD_MEAL = 'ADD_MEAL';
export const DELETE_MEAL = 'DELETE_MEAL';
export const EDIT_MEAL = 'EDIT_MEAL';
export const RESET_CALENDAR = 'RESET_CALENDAR';
export const UPDATE_CUP = 'UPDATE_CUP';
export const RESTART_WATER = 'RESTART_WATER';

/* Action methods */
export function newLogin(username, name) {
  return { type: NEW_LOGIN, username, name };
}

export function logout() {
  return { type: LOGOUT };
}

export function addMeal(newMeal, daySelected, typeSelected) {
  return { type: ADD_MEAL, newMeal, daySelected, typeSelected };
}

export function deleteMeal(daySelected, typeSelected) {
  return { type: DELETE_MEAL, daySelected, typeSelected };
}

export function editMeal(updatedMeal, daySelected, typeSelected) {
  return { type: EDIT_MEAL, updatedMeal, daySelected, typeSelected };
}

export function resetCalendar() {
  return { type: RESET_CALENDAR };
}

export function updateCup(updatedCup, index) {
  return { type: UPDATE_CUP , updatedCup, index };
}

export function restartWater() {
  return { type: RESTART_WATER };
}