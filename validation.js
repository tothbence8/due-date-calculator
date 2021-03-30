const { isInteger, isUndefined, isDate } = require('./utils');

module.exports = {
  validateSubmitDate(submitDate) {
    if (!submitDate) {
      throw new Error('submitDate is misssing');
    }
    if (!isDate(submitDate)) {
      throw new Error('submitDate is not a date');
    }
  },

  validateTurnaround(turnaround) {
    if (isUndefined(turnaround)) {
      throw new Error('turnaround is missing');
    }
    if (!isInteger(turnaround)) {
      throw new Error('turnaround is not an integer');
    }
    if (turnaround < 0) {
      throw new Error('turnaround is lower than 0');
    }
  }
};
