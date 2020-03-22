import { Dataset } from '@/lib/transformations/Dataset';
import { COLORS } from '@/constants';

export const getDatasetColorPalette = (numberOfDatasets: number) => {
  const staticColors: string[] = [
    '#4793dd',
    '#f79f06',
    '#eb5033',
    '#bab293',
    '#898a0a',
  ];

  if (numberOfDatasets <= 5) {
    return staticColors.slice(0, numberOfDatasets);
  }

  return [...Array(numberOfDatasets).keys()].map(i => {
    const hue = (360 / numberOfDatasets) * i;

    return `hsl(${hue}, 100%, 50%)`;
  });
};

export const hydrateDatasetsWithColor = (
  datasets: Dataset[],
  type?: keyof typeof COLORS,
): Dataset[] => {
  let colors: string[];
  if (datasets.length === 1 && type) {
    colors = [COLORS[type]];
  } else {
    colors = getDatasetColorPalette(datasets.length);
  }

  return datasets.map(dataSet => {
    const datasetColor = colors.pop();
    return {
      ...dataSet,
      borderColor: datasetColor,
      backgroundColor: datasetColor,
    };
  });
};
