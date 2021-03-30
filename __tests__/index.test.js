const calculator = require('../');

describe('#validation', () => {
  describe('#submitDate', () => {
    test('should throw an error if submitDate is missing', () => {
      let error;
      try {
        calculator();
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('submitDate is misssing');
    });

    test('should not throw an error if submitDate is not missing', () => {
      let error;
      const submitDate = '2021-03-29 12:12:00';
      try {
        calculator(submitDate, 5);
      } catch (e) {
        error = e;
      }
      expect(error).toBeUndefined();
    });

    test('should throw an error if submitDate is not a date', () => {
      let error;
      try {
        calculator('asdfg');
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('submitDate is not a date');
    });

    test('should not throw an error if submitDate is a date', () => {
      let error;
      const submitDate = '2021-03-29 12:12:00';
      try {
        calculator(submitDate, 5);
      } catch (e) {
        error = e;
      }
      expect(error).toBeUndefined();
    });
  });

  describe('#turnaround', () => {
    test('should throw an error if turnaround is missing', () => {
      let error;
      const submitDate = '2021-03-29 12:12:00';
      try {
        calculator(submitDate);
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('turnaround is missing');
    });

    test('should throw an error if turnaround is not an integer', () => {
      let error;
      const submitDate = '2021-03-29 12:12:00';
      const turnaround = 'asd';
      try {
        calculator(submitDate, turnaround);
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('turnaround is not an integer');
    });

    test('should not throw an error if turnaround is integer', () => {
      let error;
      const submitDate = '2021-03-29 12:12:00';
      const turnaround = 5;
      try {
        calculator(submitDate, turnaround);
      } catch (e) {
        error = e;
      }
      expect(error).toBeUndefined();
    });

    test('should throw an error if turnaround is lower than 0', () => {
      let error;
      const submitDate = '2021-03-29 12:12:00';
      const turnaround = -5;
      try {
        calculator(submitDate, turnaround);
      } catch (e) {
        error = e;
      }
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe('turnaround is lower than 0');
    });

    test('should not throw an error if turnaround is greater or equal than 0', () => {
      let error;
      const submitDate = '2021-03-29 12:12:00';
      const turnaround = 0;
      try {
        calculator(submitDate, turnaround);
      } catch (e) {
        error = e;
      }
      expect(error).toBeUndefined();
    });
  });
});

describe('#calculation', () => {
  describe('step hours in a single day', () => {
    test('should return the original submitDate if turnaround is 0', () => {
      const submitDate = '2021-03-29 12:12:00';
      const expectedDueDate = '2021. 03. 29. 12:12:00';
      const turnaround = 0;
      const dueDate = calculator(submitDate, turnaround);
      expect(dueDate).toBe(expectedDueDate);
    });

    test('should add one hour to submitDate if turnaround is 1', () => {
      const submitDate = '2021-03-29 12:12:00';
      const turnaround = 1;
      const expectedDueDate = '2021. 03. 29. 13:12:00';
      const dueDate = calculator(submitDate, turnaround);
      expect(dueDate).toBe(expectedDueDate);
    });

    test('should add 4 hours to submitDate if turnaround is 4', () => {
      const submitDate = '2021-03-29 12:12:00';
      const turnaround = 4;
      const expectedDueDate = '2021. 03. 29. 16:12:00';
      const dueDate = calculator(submitDate, turnaround);
      expect(dueDate).toBe(expectedDueDate);
    });
  });

  describe('step day(s) in weekdays', () => {
    test('should step a day if dueDate would be greater than 17:00', () => {
      const submitDate = '2021-03-29 12:12:00';
      const turnaround = 5;
      const expectedDueDate = '2021. 03. 30. 9:12:00';
      const dueDate = calculator(submitDate, turnaround);
      expect(dueDate).toBe(expectedDueDate);
    });

    test('should should return 2021. 03. 30. 16:12:00 if turnaround is 12 and submitDate is 2021-03-29 12:12:00', () => {
      const submitDate = '2021-03-29 12:12:00';
      const turnaround = 12;
      const expectedDueDate = '2021. 03. 30. 16:12:00';
      const dueDate = calculator(submitDate, turnaround);
      expect(dueDate).toBe(expectedDueDate);
    });

    test('should should return 2021. 03. 31. 16:12:00 if turnaround is 20 and submitDate is 2021-03-29 12:12:00', () => {
      const submitDate = '2021-03-29 12:12:00';
      const turnaround = 20;
      const expectedDueDate = '2021. 03. 31. 16:12:00';
      const dueDate = calculator(submitDate, turnaround);
      expect(dueDate).toBe(expectedDueDate);
    });

    test('should should return 2021. 04. 02. 16:12:00 if turnaround is 36 and submitDate is 2021-03-29 12:12:00', () => {
      const submitDate = '2021-03-29 12:12:00';
      const turnaround = 36;
      const expectedDueDate = '2021. 04. 02. 16:12:00';
      const dueDate = calculator(submitDate, turnaround);
      expect(dueDate).toBe(expectedDueDate);
    });
  })

  describe('step day(s) through weekend', () => {
    test('should should return 2021. 04. 05. 9:12:00 if turnaround is 5 and submitDate is 2021-04-02 12:12:00', () => {
      const submitDate = '2021-04-02 12:12:00';
      const turnaround = 5;
      const expectedDueDate = '2021. 04. 05. 9:12:00';
      const dueDate = calculator(submitDate, turnaround);
      expect(dueDate).toBe(expectedDueDate);
    });
  })
});
