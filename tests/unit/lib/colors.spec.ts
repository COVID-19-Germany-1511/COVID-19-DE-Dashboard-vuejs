import { getDatasetColorPalette } from '@/lib/colors';

describe('colors', () => {
  it('should return the static colors for a length up to 5', () => {
    const actualColors = getDatasetColorPalette(4);

    const expectedColors = ['#4793dd', '#f79f06', '#eb5033', '#bab293'];
    expect(actualColors).toStrictEqual(expectedColors);
  });

  it('should return dynamically generated colors for a length greater than 5', () => {
    const actualColors = getDatasetColorPalette(6);

    const expectedColors = [
      'hsl(0, 100%, 50%)',
      'hsl(60, 100%, 50%)',
      'hsl(120, 100%, 50%)',
      'hsl(180, 100%, 50%)',
      'hsl(240, 100%, 50%)',
      'hsl(300, 100%, 50%)',
    ];
    expect(actualColors).toStrictEqual(expectedColors);
  });
});
