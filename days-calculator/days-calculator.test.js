const daysCalculator = require('./days-calculator.js');
const expect = require('expect');

describe('Date Arguments', () => {
  it('should read start day, month and year correctly', () => {
    let [startDay, startMonth, startYear] = daysCalculator.getStartDates('20/10/2006');
    expect(startDay).toBe(20).toBeA('number');
  });
  it('should read end day, month and year correctly', () => {
    let [endDay, endMonth, endYear] = daysCalculator.getEndDates('08/12/1968');
    expect(endDay).toBe(8).toBeA('number');
  });
  it('should throw error for invalid dates', () => {
    try {
      daysCalculator.getStartDates('abcdef');
    } catch(error) {
      expect(error.message).toBe('Please enter dates in dd/mm/yyyy formats');
    }
  });
  it('should switch dates if start date is greater than end date', () => {
    let [startDay, startMonth, startYear, endDay, endMonth, endYear]
    = daysCalculator.switchDates(3, 1, 1989, 3, 8, 1983);
    expect(startYear).toBe(1983);
    expect(endYear).toBe(1989);
  });
});

describe('Calculate Days Between: Inner Functions', () => {
  it('should calculate days between when months and years are same', () => {
    let daysDiff
    = daysCalculator.calculateDaysForSameMonthAndYear(10, 2, 2006, 15, 2, 2006);
    expect(daysDiff).toBe(4);
  });
  it('should calculate days between when months are different and years are same', () => {
    let daysDiff
    = daysCalculator.calculateDaysForDifferentMonthsOfSameYear(20, 3, 2004, 12, 11, 2004);
    expect(daysDiff).toBe(236);
  });
  it('should calculate days between when years are different', () => {
    let daysDiff
    = daysCalculator.calculateDaysForDifferentYears(20, 3, 2004, 12, 11, 2009);
    expect(daysDiff).toBe(2062);
  });
});

describe('Calculate Days Between: Outer Function', () => {
  it('should calculate days between when months and years are same', () => {
    let [startDay, startMonth, startYear,endDay, endMonth, endYear, daysDiff]
    = daysCalculator.calculateDays('10/02/2006', '15/02/2006');
    expect(daysDiff).toBe(4);
  });
  it('should calculate days between as zero for events that finish next day', () => {
    let [startDay, startMonth, startYear,endDay, endMonth, endYear, daysDiff]
    = daysCalculator.calculateDays('10/02/2006', '11/02/2006');
    expect(daysDiff).toBe(0);
  });
  it('should calculate days between as zero for events that finish same day', () => {
    let [startDay, startMonth, startYear,endDay, endMonth, endYear, daysDiff]
    = daysCalculator.calculateDays('10/02/2006', '10/02/2006');
    expect(daysDiff).toBe(0);
  });
  it('should calculate days between when months are different and years are same', () => {
    let [startDay, startMonth, startYear,endDay, endMonth, endYear, daysDiff]
    = daysCalculator.calculateDays('20/03/2004', '12/11/2004');
    expect(daysDiff).toBe(236);
  });
  it('should calculate days between years that include a leap year', () => {
    let [startDay, startMonth, startYear,endDay, endMonth, endYear, daysDiff]
    = daysCalculator.calculateDays('20/03/2007', '12/11/2009');
    expect(daysDiff).toBe(967);
  });
  it('should calculate days between years that do not include a leap year', () => {
    let [startDay, startMonth, startYear,endDay, endMonth, endYear, daysDiff]
    = daysCalculator.calculateDays('20/03/2005', '12/11/2007');
    expect(daysDiff).toBe(966);
  });
  it('should calculate days around February end in leap year', () => {
    let [startDay, startMonth, startYear,endDay, endMonth, endYear, daysDiff]
    = daysCalculator.calculateDays('26/02/2004', '03/03/2004');
    expect(daysDiff).toBe(5);
  });
  it('should calculate days around February end in non leap year', () => {
    let [startDay, startMonth, startYear,endDay, endMonth, endYear, daysDiff]
    = daysCalculator.calculateDays('26/02/2005', '03/03/2005');
    expect(daysDiff).toBe(4);
  });
  it('should calculate days around February end in non leap year', () => {
    let [startDay, startMonth, startYear,endDay, endMonth, endYear, daysDiff]
    = daysCalculator.calculateDays('26/02/2005', '03/03/2005');
    expect(daysDiff).toBe(4);
  });


});
