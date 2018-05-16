const daysCalculator = require('./days-calculator/days-calculator.js');

// read arguments into date variables
try {
  const [startDay, startMonth, startYear,endDay, endMonth, endYear, daysDiff]
  = daysCalculator.calculateDays(process.argv[2], process.argv[3]);
  const startDateStr = `${startDay}/${startMonth}/${startYear}`;
  const endDateStr = `${endDay}/${endMonth}/${endYear}`;
  console.log(`Start Date: ${startDateStr} End Date: ${endDateStr} Output: ${daysDiff}`);
} catch(error) {
  console.log(error.message);
  process.exit();
}
