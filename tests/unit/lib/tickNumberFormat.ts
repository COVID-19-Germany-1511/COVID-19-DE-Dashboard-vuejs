import {
  formatAbsoluteTickNumbers,
  formatPercentNumbers,
} from '@/lib/tickNumberFormat';

describe('formatAbsoluteTickNumbers', () => {
  it('should leave numbers below 1000 unchanged', () => {
    expect(formatAbsoluteTickNumbers(456)).toBe(456);
  });

  it('should shorten numbers above 1000 with K suffix', () => {
    expect(formatAbsoluteTickNumbers(4000)).toBe('4K');
  });

  it('should shorten numbers above 1000000 with M suffix', () => {
    expect(formatAbsoluteTickNumbers(4000000)).toBe('4M');
  });
});

describe('formatPercentNumbers', () => {
  it('should append a percent sign', () => {
    expect(formatPercentNumbers(1.25)).toBe('1.25%');
  });
});
