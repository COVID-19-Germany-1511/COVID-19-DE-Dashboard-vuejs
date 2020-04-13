import { Dataset } from '@/lib/transformations/Dataset';
import { CaseRecordsByState } from '@/store/RootState';
import { ChartData } from 'chart.js';

function roundToNDigits(preciseNumber: number, digits: number): number {
  const scaleFactor = Math.pow(10, digits);
  return Math.round(preciseNumber * scaleFactor) / scaleFactor;
}

export const transformCaseRecordsToChartData = (
  records: CaseRecordsByState,
): Required<ChartData> => {
  const dates = Object.keys(Object.values(records)[0]);
  return {
    labels: dates,
    datasets: Object.keys(records).map(
      (stateName: string): Dataset => {
        return {
          label: stateName,
          data: Object.values(records[stateName]),
        };
      },
    ),
  };
};

export const transformCaseRecordsToNewIncidentsRecords = (
  records: CaseRecordsByState,
): CaseRecordsByState => {
  const newIncidentsByState: CaseRecordsByState = {};

  let yesterdaysNumber: number | null;
  for (const stateName in records) {
    newIncidentsByState[stateName] = {};
    yesterdaysNumber = null;
    for (const date in records[stateName]) {
      const todaysNumber = records[stateName][date];
      if (yesterdaysNumber === null) {
        yesterdaysNumber = records[stateName][date];
        continue;
      }

      newIncidentsByState[stateName][date] = todaysNumber - yesterdaysNumber;
      yesterdaysNumber = todaysNumber;
    }
  }
  return newIncidentsByState;
};

const averagePercentageRecords = (
  records: CaseRecordsByState,
  numberOfDays: number,
): CaseRecordsByState => {
  const avgRecordByState: CaseRecordsByState = {};
  let lastNCumulativeFractions = [];
  for (const stateName in records) {
    avgRecordByState[stateName] = {};
    lastNCumulativeFractions = Object.values(records[stateName])
      .slice(0, numberOfDays - 1)
      .map(percentage => percentage / 100 + 1);
    const data: [string, number][] = Object.entries(records[stateName]).slice(
      numberOfDays - 1,
    );
    for (const [date, value] of data) {
      lastNCumulativeFractions.push(value / 100 + 1);
      const productOfNCumulativeFractions = lastNCumulativeFractions.reduce(
        (sum, cur) => sum * cur,
        1,
      );
      const nthRootOfProduct = Math.pow(
        productOfNCumulativeFractions,
        1 / numberOfDays,
      );
      const averagedFraction = nthRootOfProduct - 1;

      avgRecordByState[stateName][date] = roundToNDigits(
        averagedFraction * 100,
        2,
      );
      lastNCumulativeFractions.shift();
    }
  }

  return avgRecordByState;
};

const averageAdditiveRecords = (
  records: CaseRecordsByState,
  numberOfDays: number,
): CaseRecordsByState => {
  const avgRecordByState: CaseRecordsByState = {};
  let lastNvalues = [];
  for (const stateName in records) {
    avgRecordByState[stateName] = {};
    lastNvalues = Object.values(records[stateName]).slice(0, numberOfDays - 1);

    const data = Object.entries(records[stateName]).slice(numberOfDays - 1);
    for (const [date, value] of data) {
      lastNvalues.push(value);
      avgRecordByState[stateName][date] = roundToNDigits(
        lastNvalues.reduce((sum, cur) => sum + cur, 0) / numberOfDays,
        2,
      );
      lastNvalues.shift();
    }
  }

  return avgRecordByState;
};

export const averageRecords = (
  records: CaseRecordsByState,
  numberOfDays: number,
  method: 'additive' | 'percentage',
): CaseRecordsByState => {
  if (method === 'percentage') {
    return averagePercentageRecords(records, numberOfDays);
  }

  return averageAdditiveRecords(records, numberOfDays);
};

export const transformCaseRecordsToMortaility = (
  confirmed: CaseRecordsByState,
  deaths: CaseRecordsByState,
): CaseRecordsByState => {
  const mortalityByState: CaseRecordsByState = {};

  for (const stateName in confirmed) {
    const stateData = confirmed[stateName];
    mortalityByState[stateName] = {};
    for (const date in stateData) {
      const dayConfirmedCount = stateData[date];
      if (dayConfirmedCount === 0) {
        mortalityByState[stateName][date] = 0;
        continue;
      }
      const dayDeaths = deaths[stateName][date];
      // format: 1.25%
      const mortality = roundToNDigits(
        (dayDeaths / dayConfirmedCount) * 100,
        2,
      );
      mortalityByState[stateName][date] = mortality;
    }
  }

  return mortalityByState;
};

export const calculateRelativeNewIncidentsRecords = (
  newIncidents: CaseRecordsByState,
  totalIncidents: CaseRecordsByState,
): CaseRecordsByState => {
  const relativeNewIncidents: CaseRecordsByState = {};

  for (const stateName in newIncidents) {
    relativeNewIncidents[stateName] = {};
    const stateNewIncidents = Object.values(newIncidents[stateName]);
    const datesWithNecIncidentsData = Object.keys(newIncidents[stateName]);
    const stateTotalIncidents = Object.values(totalIncidents[stateName]);

    for (const index in datesWithNecIncidentsData) {
      relativeNewIncidents[stateName][
        datesWithNecIncidentsData[index]
      ] = roundToNDigits(
        (stateNewIncidents[index] / stateTotalIncidents[index]) * 100,
        2,
      );
    }
  }

  return relativeNewIncidents;
};

export const calculateGrowthFactorFromNewIncidentsRecords = (
  newIncidents: CaseRecordsByState,
): CaseRecordsByState => {
  const growthFactorRecords: CaseRecordsByState = {};

  let yesterdaysNumber: number | null;
  for (const stateName in newIncidents) {
    growthFactorRecords[stateName] = {};
    yesterdaysNumber = null;

    for (const date in newIncidents[stateName]) {
      const todaysNumber = newIncidents[stateName][date];
      if (yesterdaysNumber === null) {
        yesterdaysNumber = newIncidents[stateName][date];
        continue;
      }

      growthFactorRecords[stateName][date] = roundToNDigits(
        todaysNumber / yesterdaysNumber,
        2,
      );
      yesterdaysNumber = todaysNumber;
    }
  }

  return growthFactorRecords;
};
