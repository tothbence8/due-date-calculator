module.exports = {
  isDate: dateString => new Date(dateString) !== 'Invalid Date' && !isNaN(new Date(dateString)),
  isInteger: number => Number.isInteger(number),
  isUndefined: value => value === undefined,
  isFriday: date => date.getDay() === 5,
  addHoursToDate(date, hours) {
    const hoursToMilliseconds = hours => hours * 60 * 60 * 1000;
    const originalMilliseconds = date.getTime();
    const addMilliseconds = hoursToMilliseconds(hours);
    return new Date(originalMilliseconds + addMilliseconds);
  },
  addDaysToDate(date, days) {
    const newDate = new Date(date);
    newDate.setDate(date.getDate() + days);
    return newDate;
  }
};
