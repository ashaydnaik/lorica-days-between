// checks if start and end months or years are same
module.exports.isSameDuration = (startDuration, endDuration) => (endDuration - startDuration === 0 ? true : false);

// checks for leap year
const isLeapYear = (year) => (year % 4 === 0 ? true : false);

// returns the days for 12 months as an array
module.exports.getMonthDays = (year) => {
  if(isLeapYear(year)) {
    return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  } else {
    return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }
};

// returns total number of days between start and end years
module.exports.getYearDays = (startYear, endYear) => {
  let year = endYear;
  let yearDays = 0;
  while(year >= startYear) {
    if(isLeapYear(year)) {
      yearDays += 366;
    } else {
      yearDays += 365;
    }
    year--;
  }
  return yearDays;
};
