import { Dataset } from '@/lib/transformations/Dataset';
import { CaseRecordsByState } from '@/store/RootState';
import { ChartData } from 'chart.js';

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

export const averageRecords = (
  records: CaseRecordsByState,
  numberOfDays: number,
  method: 'additive' | 'multiplicative',
): CaseRecordsByState => {
  if (method === 'multiplicative') {
    throw new Error('not yet implemented');
  }

  const avgRecordByState: CaseRecordsByState = {};

  let lastNvalues = [];
  for (const stateName in records) {
    avgRecordByState[stateName] = {};
    lastNvalues = Object.values(records[stateName]).slice(0, numberOfDays - 1);

    const data = Object.entries(records[stateName]).slice(numberOfDays - 1);
    for (const [date, value] of data) {
      lastNvalues.push(value);
      avgRecordByState[stateName][date] =
        lastNvalues.reduce((sum, cur) => sum + cur, 0) / numberOfDays;
      lastNvalues.shift();
    }
  }

  return avgRecordByState;
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
      const mortality =
        Math.round((dayDeaths / dayConfirmedCount) * 10000) / 100;
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
      relativeNewIncidents[stateName][datesWithNecIncidentsData[index]] =
        Math.round(
          (stateNewIncidents[index] / stateTotalIncidents[index]) * 10000,
        ) / 100;
    }
  }

  return relativeNewIncidents;
};
