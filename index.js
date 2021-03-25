// import yargs from 'yargs';
// import calculateDueDate from './calculateDueDate.js';

const yargs = require('yargs');
const calculateDueDate = require('./calculateDueDate');
const dayjs = require('dayjs');
// const hu = require('dayjs/locale/hu');
// console.log(yargs);
// dayjs.locale(hu);

//  Inputok ellenorzese?
yargs.command({
  command: 'calculate',
  describe: 'Calculate due date',
  builder: {
    submitDate: {
      describe: 'The date, when the problem is submitted (format: YYYY-MM-DD)',
      demandOption: true,
      type: 'string'
    },

    submitTime: {
      describe: 'The time, when the problem is submitted (format: HH:MM:SS)',
      demandOption: true,
      type: 'string'
    },
    turnaround: {
      describe: 'Planned working hours on the given problem',
      demandOption: true,
      type: 'string'
    }
  },
  handler(argv) {
    // let submitDate = argv.submitDate + 'T' + argv.submitTime + '.000Z';
    let submitDate = argv.submitDate + ' ' + argv.submitTime;
    const test = new Date('2021-04-22');
    // console.log(test);
    // console.log(test.getHours());
    // test.setHours(9);
    // console.log(test);
    // console.log(test.getHours());
    // console.log(test.getTimezoneOffset());
    console.log('test.toDateString()', test.toString());
    const finishDate = calculateDueDate(submitDate, argv.turnaround);
    console.log(finishDate);
  }
});

yargs.parse();
