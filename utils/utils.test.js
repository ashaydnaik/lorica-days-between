const utils = require('./utils');
const expect = require('expect');

describe('Utility functions for calculating days between', () => {
  it('should return true if start duration and end duration are same', () => {
    expect(utils.isSameDuration(2005, 2005)).toBe(true).toBeA('boolean');
  });

  it('should return false if start duration and end duration are different', () => {
      expect(utils.isSameDuration(10, 11)).toBe(false).toBeA('boolean');
  });

  it('should return February with 29 days for leap years', () => {
    expect(utils.getMonthDays(2016)[1]).toBe(29);
  });

  it('should return February with 28 days for non-leap years', () => {
    expect(utils.getMonthDays(2017)[1]).toBe(28);
  });
})
