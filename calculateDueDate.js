const WORK_HOURS = 8;
const WORK_DAYS = 5;
const BEGIN_HOUR = 9;
const END_HOUR = 17;
const WEEK_DAYS_NUMBER = 7;
const WEEKEND_THRESHOLD = 3;
const SATURDAY_DAY_NUMBER = 6;
const SUNDAY_DAY_NUMBER = 0;

const validate = (submitDate, turnaround) => {
  if (!(submitDate instanceof Date) || isNaN(submitDate)) {
    throw new Error('SubmitDate is invalid');
  }
  if (!turnaround) {
    throw new Error('Turnaround is required');
  }
  if (!Number.isInteger(turnaround)) {
    throw new Error('Turnaround is not a number');
  }
};

const calculateDueDate = (submitDate, turnaround) => {
  const submitDateTime = new Date(submitDate);
  validate(submitDateTime, turnaround);
  const startWorkingTime = getStartWorkingTime(submitDateTime);
  const clearDevDays = Math.floor(turnaround / WORK_HOURS);
  const clearDevWeeks = Math.floor(clearDevDays / WORK_DAYS);
  const restDevDays = clearDevDays % WORK_DAYS;
  const restDevHours = turnaround % WORK_HOURS;

  const tempEndWeek = clearDevWeeks !== 0 ?
    addDays(startWorkingTime, clearDevWeeks * WEEK_DAYS_NUMBER) :
    startWorkingTime;

  let tempEndDate = new Date(tempEndWeek);

  if (restDevDays) {
    if (tempEndWeek.getDay() + restDevDays > 5) {
      tempEndDate = addDays(tempEndWeek, restDevDays + 2);
    } else {
      tempEndDate = addDays(tempEndWeek, restDevDays);
    }
  }

  let tempEndDateTime = new Date(tempEndDate);
  tempEndDateTime.setHours(tempEndDateTime.getHours() + restDevHours);

  let endDateTime = new Date(tempEndDateTime);
  if (tempEndDateTime.getHours() >= END_HOUR) {
    tempEndDateTime.setHours(tempEndDateTime.getHours() - WORK_HOURS);
    if (tempEndDateTime.getDay() === WORK_DAYS) {
      endDateTime = addDays(tempEndDateTime, WEEKEND_THRESHOLD);
    } else {
      endDateTime = addDays(tempEndDateTime, 1);
    }
  }
  console.log(endDateTime);
  return endDateTime.toLocaleString('hu-HU', { timezone: 'Europe/Budapest' });
};

const getStartWorkingTime = (dateTime) => {
  if (dateTime.getDay() === SUNDAY_DAY_NUMBER) {
    const nextWorkingDay = addDays(dateTime, 1);
    nextWorkingDay.setHours(BEGIN_HOUR, 0, 0, 0);
    return nextWorkingDay;
  }
  if (dateTime.getDay() === SATURDAY_DAY_NUMBER) {
    const nextWorkingDay = addDays(dateTime, 2);
    nextWorkingDay.setHours(BEGIN_HOUR, 0, 0, 0);
    return nextWorkingDay;
  }
  if (dateTime.getHours() < BEGIN_HOUR) {
    const nextTime = new Date(dateTime);
    nextTime.setHours(BEGIN_HOUR, 0, 0, 0);
    return nextTime;
  }
  if (dateTime.getHours() >= END_HOUR) {
    const nextDay = addDays(dateTime, 1);
    nextDay.setHours(BEGIN_HOUR, 0, 0, 0);
    return getStartWorkingTime(nextDay);
  } else {
    return dateTime;
  }
};

const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

module.exports = calculateDueDate;
