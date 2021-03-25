const calculateDueDate = require('./');

describe('#validation', () => {
  test('should throw an error if sumbitDate is not valid', () => {
    let error;
    try {
      calculateDueDate('asd');
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('SubmitDate is invalid');
  });
  test('should throw an error if turnaround is missing', () => {
    let error;
    try {
      calculateDueDate('2021-03-25 11:12:00');
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Turnaround is required');
  });
  test('should throw an error if turnaround is not number', () => {
    let error;
    try {
      calculateDueDate('2021-03-25 11:12:00', 'asd');
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('Turnaround is not a number');
  });
});

const testCases = [
  { submitDate: '2021-03-17 13:21:11', turnaround: 1, expectedResult: '2021. 03. 17. 14:21:11' },
  { submitDate: '2021-03-17 13:21:11', turnaround: 3, expectedResult: '2021. 03. 17. 16:21:11' },
  { submitDate: '2021-03-17 13:21:11', turnaround: 8, expectedResult: '2021. 03. 18. 13:21:11' },
  { submitDate: '2021-03-17 13:21:11', turnaround: 16, expectedResult: '2021. 03. 19. 13:21:11' },
  { submitDate: '2021-03-17 13:21:11', turnaround: 72, expectedResult: '2021. 03. 30. 13:21:11' },
  { submitDate: '2021-02-28 13:21:11', turnaround: 10, expectedResult: '2021. 03. 02. 11:00:00' },
  { submitDate: '2020-02-28 13:21:11', turnaround: 10, expectedResult: '2020. 03. 02. 15:21:11' },
  { submitDate: '2020-12-31 13:21:11', turnaround: 10, expectedResult: '2021. 01. 01. 15:21:11' },
  { submitDate: '2021-03-17 13:21:11', turnaround: 1500, expectedResult: '2021. 12. 06. 9:21:11' }
];
describe('#calculation', () => {
  testCases.forEach(({ submitDate, turnaround, expectedResult }) => {
    test(`${submitDate} submitdate with ${turnaround} turnaround`, () => {
      expect(calculateDueDate(submitDate, turnaround))
      .toBe(expectedResult);
    });
  });
});

