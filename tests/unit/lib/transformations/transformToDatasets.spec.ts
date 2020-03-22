import { CaseRecordsByState } from '@/store/RootState';
import {
  averageRecords,
  transformCaseRecordsToChartData,
  transformCaseRecordsToMortaility,
  transformCaseRecordsToNewIncidentsRecords,
} from '@/lib/transformations/transformToDatasets';
import { ChartData } from 'chart.js';

describe('transformCaseRecordsToChartData', () => {
  it('should transfrom a map of case records into ChartData', () => {
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

    const actualDatasets = transformCaseRecordsToChartData(exampleData);

    const expectedChartData: ChartData = {
      labels: ['2020-03-14', '2020-03-15'],
      datasets: [
        {
          label: 'Berlin',
          data: [123, 163],
        },
        {
          label: 'Bayern',
          data: [345, 485],
        },
      ],
    };
    expect(actualDatasets).toStrictEqual(expectedChartData);
  });
});

describe('transformCaseRecordsToMortaility', () => {
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

    const actualMortalityRecords = transformCaseRecordsToMortaility(
      exampleConfirmed,
      exampleDeaths,
    );

    const expectedRecords: CaseRecordsByState = {
      Berlin: {
        '2020-03-12': 0,
        '2020-03-14': 2.44,
        '2020-03-15': 3.07,
      },
      Bayern: {
        '2020-03-14': 1.16,
        '2020-03-15': 1.65,
      },
    };

    expect(actualMortalityRecords).toStrictEqual(expectedRecords);
  });
});

describe('transformCaseRecordsToNewIncidentsDataset', () => {
  it('should calculate the difference between two days', () => {
    const exampleConfirmed: CaseRecordsByState = {
      Berlin: {
        '2020-03-11': 90,
        '2020-03-12': 100,
        '2020-03-13': 108,
        '2020-03-14': 123,
        '2020-03-15': 163,
      },
    };

    const actualRecords = transformCaseRecordsToNewIncidentsRecords(
      exampleConfirmed,
    );

    const expectedRecords: CaseRecordsByState = {
      Berlin: {
        '2020-03-12': 10,
        '2020-03-13': 8,
        '2020-03-14': 15,
        '2020-03-15': 40,
      },
    };

    expect(actualRecords).toStrictEqual(expectedRecords);
  });
});

describe('averageRecords', () => {
  it('should create a mean for additive values', () => {
    const exampleDatasets: CaseRecordsByState = {
      Berlin: {
        '2020-03-07': 50,
        '2020-03-08': 60,
        '2020-03-09': 70,
        '2020-03-10': 80,
        '2020-03-11': 90,
        '2020-03-12': 100,
        '2020-03-13': 108,
        '2020-03-14': 123,
        '2020-03-15': 163,
      },
    };

    const actualAveragedRecords = averageRecords(
      exampleDatasets,
      4,
      'additive',
    );

    const expectedAverageRecords: CaseRecordsByState = {
      Berlin: {
        '2020-03-10': 65,
        '2020-03-11': 75,
        '2020-03-12': 85,
        '2020-03-13': 94.5,
        '2020-03-14': 105.25,
        '2020-03-15': 123.5,
      },
    };

    expect(actualAveragedRecords).toStrictEqual(expectedAverageRecords);
  });

  it.todo('should create the root of the product of multiplicative values');
});
