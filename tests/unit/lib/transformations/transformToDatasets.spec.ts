import { CaseRecordsByState } from '@/store/RootState';
import {
  transformCaseRecordsToDataset,
  transformCaseRecordsToMortailityDataset,
} from '@/lib/transformations/transformToDatasets';
import { Dataset } from '@/lib/transformations/Dataset';

describe('transformToDatasets', () => {
  it('should transfrom a map of case records into a list of datasets', () => {
    const exampleData: CaseRecordsByState = {
      Berlin: {
        '2020-03-14': 123,
        '2020-03-15': 163,
      },
      Bayern: {
        '2020-03-14': 345,
        '2020-03-15': 485,
      },
    };

    const actualDatasets = transformCaseRecordsToDataset(exampleData);

    const expectedDatasets: Dataset[] = [
      {
        label: 'Berlin',
        data: [123, 163],
      },
      {
        label: 'Bayern',
        data: [345, 485],
      },
    ];
    expect(actualDatasets).toStrictEqual(expectedDatasets);
  });
});

describe('transformCaseRecordsToMortailityDataset', () => {
  it('should calculate the mortality and return datasets', () => {
    const exampleConfirmed: CaseRecordsByState = {
      Berlin: {
        '2020-03-12': 0,
        '2020-03-14': 123,
        '2020-03-15': 163,
      },
      Bayern: {
        '2020-03-14': 345,
        '2020-03-15': 485,
      },
    };

    const exampleDeaths: CaseRecordsByState = {
      Berlin: {
        '2020-03-12': 0,
        '2020-03-14': 3,
        '2020-03-15': 5,
      },
      Bayern: {
        '2020-03-14': 4,
        '2020-03-15': 8,
      },
    };

    const actualMortalityDatasets = transformCaseRecordsToMortailityDataset(
      exampleConfirmed,
      exampleDeaths,
    );

    const expectedMortalityDatasets: Dataset[] = [
      {
        label: 'Berlin',
        data: [0, 2.44, 3.07],
      },
      {
        label: 'Bayern',
        data: [1.16, 1.65],
      },
    ];

    expect(actualMortalityDatasets).toStrictEqual(expectedMortalityDatasets);
  });
});
