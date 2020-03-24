import { CaseRecordsByState } from '@/store/RootState';
import {
  averageRecords,
  calculateRelativeNewIncidentsRecords,
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

  it.todo('trims date with invalid data from the beginning or end');
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
    const exampleRecords: CaseRecordsByState = {
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

    const actualAveragedRecords = averageRecords(exampleRecords, 4, 'additive');

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

  it('should create the root of the product of percentage values', () => {
    const exampleRecords: CaseRecordsByState = {
      Berlin: {
        '2020-03-05': 44.44,
        '2020-03-06': 46.15,
        '2020-03-07': 47.37,
        '2020-03-08': 42.86,
        '2020-03-09': 20,
        '2020-03-10': 20.83,
        '2020-03-11': 39.66,
        '2020-03-12': 45.68,
        '2020-03-13': 33.9,
        '2020-03-14': 38.61,
        '2020-03-15': 20.09,
      },
    };

    const actualAveragedRecords = averageRecords(
      exampleRecords,
      4,
      'percentage',
    );

    const expectedAverageRecords: CaseRecordsByState = {
      Berlin: {
        '2020-03-08': 45.19,
        '2020-03-09': 38.62,
        '2020-03-10': 32.18,
        '2020-03-11': 30.42,
        '2020-03-12': 31.06,
        '2020-03-13': 34.7,
        '2020-03-14': 39.4,
        '2020-03-15': 34.24,
      },
    };

    expect(actualAveragedRecords).toStrictEqual(expectedAverageRecords);
  });
});

describe('calculateRelativeNewIncidentsRecords', () => {
  it('should calculate records based on absolute and new data', () => {
    const exampleConfirmed: CaseRecordsByState = {
      Berlin: {
        '2020-03-11': 90,
        '2020-03-12': 100,
        '2020-03-13': 108,
        '2020-03-14': 123,
        '2020-03-15': 163,
      },
    };

    const newCasesFromExampleConfirmed: CaseRecordsByState = {
      Berlin: {
        '2020-03-12': 10,
        '2020-03-13': 8,
        '2020-03-14': 15,
        '2020-03-15': 40,
      },
    };

    const actualRelativeIncrease: CaseRecordsByState = calculateRelativeNewIncidentsRecords(
      newCasesFromExampleConfirmed,
      exampleConfirmed,
    );

    const expectedRelativeIncrease: CaseRecordsByState = {
      Berlin: {
        '2020-03-12': 11.11,
        '2020-03-13': 8,
        '2020-03-14': 13.89,
        '2020-03-15': 32.52,
      },
    };

    expect(actualRelativeIncrease).toStrictEqual(expectedRelativeIncrease);
  });
});
