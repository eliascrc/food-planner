import { formatDateGoogle } from "./commons";
import dayjs from 'dayjs';

const event = {
  'summary': '',
  'description': '',
  'start': {
    'dateTime': '',
    'timeZone': 'America/Costa_Rica'
  },
  'end': {
    'dateTime': '',
    'timeZone': 'America/Costa_Rica'
  },
  'reminders': {
    'useDefault': false,
    'overrides': [
      { 'method': 'popup', 'minutes': 10 }
    ]
  }
};

function increaseOneHour(time) {
  const hour = time.split(':')[0];
  const minutes = time.split(':')[1];
  return dayjs().set('hour', hour).set('minutes', minutes).add(1, 'hour').format('HH:mm');
}

export function createEvent(ApiCalendar, meal, typeIndex, dayIndex, daysInfo, success, error) {

  const titles = ['Breakfast', 'Lunch', 'Dinner'];
  event.summary = titles[typeIndex];
  event.description = meal.description;
  event.start.dateTime = `${formatDateGoogle(daysInfo[dayIndex])}T${meal.time}:00-06:00`;
  event.end.dateTime = `${formatDateGoogle(daysInfo[dayIndex])}T${increaseOneHour(meal.time)}:00-06:00`;

  console.log(event);
  ApiCalendar.createEvent(event)
    .then((result) => {
      success(result);
    })
    .catch((result) => {
      error(result);
    });

}

export function createWaterEvent(ApiCalendar, time, success, error) {

  event.summary = 'Drink Water!';
  event.description = 'You need to drink water in order to stay healthy!';
  event.start.dateTime = `${formatDateGoogle(dayjs())}T${time}:00-06:00`;
  event.end.dateTime = `${formatDateGoogle(dayjs())}T${time}:00-06:00`;

  console.log(event);
  ApiCalendar.createEvent(event)
    .then((result) => {
      success(result);
    })
    .catch((result) => {
      error(result);
    });

}