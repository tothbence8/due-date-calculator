const {
  isDate,
  isInteger,
  isUndefined,
  isFriday,
  addHoursToDate,
  addDaysToDate
} = require('../utils');

describe('#isDate', () => {
  test('should isDate return false, if dateString is not a valid date', () => {
    const dateString = 'asd';
    const result = isDate(dateString);
    expect(result).toBeFalsy();
  });

  test('should isDate return true, if dateString is a valid date', () => {
    const dateString = '2021-03-30 12:00:00';
    const result = isDate(dateString);
    expect(result).toBeTruthy();
  });
});

describe('#isInteger', () => {
  test('should isInteger return false, if number is not an integer', () => {
    const number = 'asd';
    const result = isInteger(number);
    expect(result).toBeFalsy();
  });

  test('should isInteger return true, if number is an integer', () => {
    const number = 123;
    const result = isInteger(number);
    expect(result).toBeTruthy();
  });

  test('should isInteger return false, if number is false', () => {
    const number = false;
    const result = isInteger(number);
    expect(result).toBeFalsy();
  });

  test('should isInteger return false, if number is true', () => {
    const number = true;
    const result = isInteger(number);
    expect(result).toBeFalsy();
  });
});

describe('#isUndefined', () => {
  test('should isUndefined return true, if value is undefined', () => {
    const value = undefined;
    const result = isUndefined(value);
    expect(result).toBeTruthy();
  });
  test('should isUndefined return false, if value is not undefined', () => {
    const value = null;
    const result = isUndefined(value);
    expect(result).toBeFalsy();
  });
});

describe('#isFriday', () => {
  test('should isFriday return true, if the day of the date is friday', () => {
    const date = new Date('2021-04-02');
    const result = isFriday(date);
    expect(result).toBeTruthy();
  });
  test('should isFriday return false, if the day of the date is not friday', () => {
    const date = new Date('2021-04-01');
    const result = isFriday(date);
    expect(result).toBeFalsy();
  });
});
describe('#addHoursToDate', () => {
  test('should addHoursToDate return 2021-04-02 12:21:11, if date is 2021-04-02 11:21:11 and add 1 hour', () => {
    const date = new Date('2021-04-02 11:21:11');
    const expectedDate = new Date('2021-04-02 12:21:11').getTime();
    const result = addHoursToDate(date, 1).getTime();
    expect(result).toBe(expectedDate);
  });
  test('should addHoursToDate return 2021-04-03 00:21:11, if date is 2021-04-02 11:21:11 and add 13 hours', () => {
    const date = new Date('2021-04-02 11:21:11');
    const expectedDate = new Date('2021-04-03 00:21:11').getTime();
    const result = addHoursToDate(date, 13).getTime();
    expect(result).toBe(expectedDate);
  });
  test('should addHoursToDate return 2021-05-01 00:21:11, if date is 2021-04-30 11:21:11 and add 13 hours', () => {
    const date = new Date('2021-04-30 11:21:11');
    const expectedDate = new Date('2021-05-01 00:21:11').getTime();
    const result = addHoursToDate(date, 13).getTime();
    expect(result).toBe(expectedDate);
  });
});

describe('#addDaysToDate', () => {
  test('should addDaysToDate return 2021-04-03 11:21:11, if date is 2021-04-02 11:21:11 and add 1 day', () => {
    const date = new Date('2021-04-02 11:21:11');
    const expectedDate = new Date('2021-04-03 11:21:11').getTime();
    const result = addDaysToDate(date, 1).getTime();
    expect(result).toBe(expectedDate);
  });
  test('should addDaysToDate return 2021-05-01 11:21:11, if date is 2021-04-02 11:21:11 and add 29 days', () => {
    const date = new Date('2021-04-02 11:21:11');
    const expectedDate = new Date('2021-05-01 11:21:11').getTime();
    const result = addDaysToDate(date, 29).getTime();
    expect(result).toBe(expectedDate);
  });
  test('should addDaysToDate return 2022-01-01 11:21:11, if date is 2021-12-01 11:21:11 and add 31 days', () => {
    const date = new Date('2021-12-01 11:21:11');
    const expectedDate = new Date('2022-01-01 11:21:11').getTime();
    const result = addDaysToDate(date, 31).getTime();
    expect(result).toBe(expectedDate);
  });
});
