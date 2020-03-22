import { getDatasetColorPalette, hydrateDatasetsWithColor } from '@/lib/colors';
import { Dataset } from '@/lib/transformations/Dataset';
import { COLORS } from '@/constants';

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

describe('hydrateDatasetsWithColor', () => {
  it('should return the custom color for single confirmed cases data set', () => {
    const datasets: Dataset[] = [
      {
        data: [],
        label: '',
      },
    ];

    const actualHydratedDatasets = hydrateDatasetsWithColor(
      datasets,
      'confirmed',
    );

    expect(actualHydratedDatasets[0].borderColor).toBe(COLORS.confirmed);
    expect(actualHydratedDatasets[0].backgroundColor).toBe(COLORS.confirmed);
  });

  it('should return the custom color for single deaths cases data set', () => {
    const datasets: Dataset[] = [
      {
        data: [],
        label: '',
      },
    ];

    const actualHydratedDatasets = hydrateDatasetsWithColor(datasets, 'deaths');

    expect(actualHydratedDatasets[0].borderColor).toBe(COLORS.deaths);
    expect(actualHydratedDatasets[0].backgroundColor).toBe(COLORS.deaths);
  });

  it.todo('should take the first color from the palette, if there is no type');

  it.todo(
    'should get the colors from the dataset color palette, if there is more than one set',
  );
});
