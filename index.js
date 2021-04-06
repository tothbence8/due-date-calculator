const {
  START_HOUR_OF_DAY,
  END_HOUR_OF_DAY
} = require('./consts');

const {
  isFriday,
  addHoursToDate,
  addDaysToDate
} = require('./utils');

const {
  validateSubmitDate,
  validateTurnaround
} = require('./validation');

const calculateDueDate = (currentDate, remainingHours) => {
  if (remainingHours === 0) {
    return currentDate;
  }

  let dueDate = addHoursToDate(currentDate, 1);
  if (dueDate.getHours() >= END_HOUR_OF_DAY) {
    if (isFriday(dueDate)) {
      dueDate = addDaysToDate(dueDate, 2);
    }
    dueDate = addDaysToDate(dueDate, 1);
    dueDate.setHours(START_HOUR_OF_DAY);
  }

  return calculateDueDate(dueDate, remainingHours - 1);
};

const calculator = (submitDate, turnaround) => {
  validateSubmitDate(submitDate);
  validateTurnaround(turnaround);

  const dueDate = calculateDueDate(new Date(submitDate), turnaround);

  return dueDate.toLocaleString('hu-HU');
};

module.exports = calculator;
