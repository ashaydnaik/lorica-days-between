const utils = require('../utils/utils.js');

// parse start date, month and year
const getStartDates = (startDateStr) => {
  return startDateStr.split('/').map(val => parseInt(val));
}

// parse end date, month and year
const getEndDates = (endDateStr) => {
  return endDateStr.split('/').map(val => parseInt(val));
}

// switch dates if user enters end date less than start date
const switchDates = (startDay, startMonth, startYear, endDay, endMonth, endYear) => {
  if(startYear > endYear ||
      (startYear === endYear && startMonth > endMonth) ||
      (startYear === endYear && startMonth === endMonth && startDay > endDay)) {
        let [tempDay, tempMonth, tempYear] = [endDay, endMonth, endYear];
        [endDay, endMonth, endYear] = [startDay, startMonth, startYear];
        [startDay, startMonth, startYear] = [tempDay, tempMonth, tempYear];
  }
  return [startDay, startMonth, startYear, endDay, endMonth, endYear];
}

// Scenario 1: calculate days between when days are different, months & years are same
const calculateDaysForSameMonthAndYear
  = (startDay, startMonth, startYear, endDay, endMonth, endYear) => (endDay - startDay - 1);

// Scenario 2: days maybe same or different, months are different, years are same
// Sample working: 20/03/2005 to 12/11/2005
const calculateDaysForDifferentMonthsOfSameYear
 = (startDay, startMonth, startYear, endDay, endMonth, endYear) => {

   // 1. Get total number of days from March to November, inclusive
   let monthDays = utils.getMonthDays(startYear)
                      .slice(startMonth - 1, endMonth)
                      .reduce(function(acc, val) { return acc + val; }, 0);

   // 2. Remove 20 days for March and 30 - 12 days for November
   return daysDiff = monthDays - startDay - (utils.getMonthDays(startYear)[endMonth - 1] - endDay) - 1;
}

// Scenario 3: days and months may be same or different, years are different
// Sample working: 20/03/2004 to 12/11/2009
const calculateDaysForDifferentYears
  = (startDay, startMonth, startYear, endDay, endMonth, endYear) => {
    // 1. Get total number of days from 2004 to 2009, inclusive
    let yearDays = utils.getYearDays(startYear, endYear);

    // 2. Get the number of days from Jan to Feb 2004
    let startDateExcess = utils.getMonthDays(startYear)
                             .slice(0, startMonth - 1)
                             .reduce(function(acc, val) { return acc + val; }, 0);

    // 3. Add the days from 1 to 20 Mar - these are excess days counted for 2004
    startDateExcess += startDay;

    // 4. Get the number of days from Nov to Dec 2009
    let endDateExcess = utils.getMonthDays(endYear)
                             .slice(endMonth - 1)
                             .reduce(function(acc, val) { return acc + val; }, 0);

    // 5. Subtract the days from 1 to 12 Nov - these are excess days counted for 2009
    endDateExcess -= endDay;

    // 6. Subtract the excess days counted for 2004 and 2009 from the total number of days
    return daysDiff = yearDays - startDateExcess - endDateExcess - 1;
}

module.exports.calculateDays = (startDateStr, endDateStr) => {

  let startDay, startMonth, startYear, endDay, endMonth, endYear, daysDiff = 0;

  // read arguments into date variables
  try {
    [startDay, startMonth, startYear] = getStartDates(startDateStr);
    [endDay, endMonth, endYear] = getEndDates(endDateStr);
  } catch(error) {
    throw new Error('Please enter dates in dd/mm/yyyy formats');
  }

  // switch dates if start date > end date
  // based on sample data provided: 03/01/1989 03/08/1983 1979
  [startDay, startMonth, startYear, endDay, endMonth, endYear]
   = switchDates(startDay, startMonth, startYear, endDay, endMonth, endYear);

  if(utils.isSameDuration(startYear, endYear)) {
    if(utils.isSameDuration(startMonth, endMonth)) {
      if(utils.isSameDuration(startDay, endDay)) {
        daysDiff = 0;
      } else {
        daysDiff
          = calculateDaysForSameMonthAndYear(startDay, startMonth, startYear,
                                            endDay, endMonth, endYear);
      }
    } else {
      daysDiff
        = calculateDaysForDifferentMonthsOfSameYear(startDay, startMonth, startYear,
                                                      endDay, endMonth, endYear);
    }
  } else {
    daysDiff
      = calculateDaysForDifferentYears(startDay, startMonth, startYear,
                                                    endDay, endMonth, endYear);
  }

  return [startDay, startMonth, startYear,endDay, endMonth, endYear, daysDiff];
}

// required for unit tests :(
module.exports.getStartDates = getStartDates;
module.exports.getEndDates = getEndDates;
module.exports.switchDates = switchDates;
module.exports.calculateDaysForSameMonthAndYear = calculateDaysForSameMonthAndYear;
module.exports.calculateDaysForDifferentMonthsOfSameYear = calculateDaysForDifferentMonthsOfSameYear;
module.exports.calculateDaysForDifferentYears = calculateDaysForDifferentYears;
