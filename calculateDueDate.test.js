const calculateDueDate = require('./calculateDueDate');

describe('#validation', () => {
  test('should throw an error if sumbitDate is missing', () => {
    let error;
    try{
      calculateDueDate()
    } catch (e) {
      error = e;
    }
    expect(error).toBeInstanceOf(Error);
    expect(error.message).toBe('SubmitDate is required');
  });
  test('2021-03-17 13:21:11 submitdate with 3 turnaround', () => {
    expect(calculateDueDate('2021-03-17 13:21:11', 3))
    .toBe('2021. 03. 17. 16:21:11');
  });
});

