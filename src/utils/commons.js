import dayjs from 'dayjs';

export function getDaysOfTheWeek() {
  let day = dayjs().startOf('week').add(1, 'day');
  const daysOfWeek = [];
  for (let index = 0; index < 7; index++) {
    daysOfWeek.push(day);
    day = day.add(1, 'day');
  }

  return daysOfWeek;
}

export function formatDateDMY(date) {
  return date.format('DD/MM/YYYY');
}

export function formatDateGoogle(date) {
  return date.format('YYYY-MM-DD');
}

export function getParsedDayJS(stringDate) {
  return dayjs(stringDate);
}