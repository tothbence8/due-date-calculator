const yargs = require('yargs');
const calculateDueDate = require('./calculateDueDate');

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
    const submitDate = `${argv.submitDate} ${argv.submitTime}`;
    const finishDate = calculateDueDate(submitDate, argv.turnaround);
    console.log(finishDate);
  }
});

yargs.parse();
