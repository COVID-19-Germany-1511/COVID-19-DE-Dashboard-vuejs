import { Dataset } from '@/lib/transformations/Dataset';
import { CaseRecordsByState } from '@/store/RootState';

export const transformCaseRecordsToDataset = (
  records: CaseRecordsByState,
): Dataset[] => {
  return Object.keys(records).map(
    (stateName: string): Dataset => {
      return {
        label: stateName,
        data: Object.values(records[stateName]),
      };
    },
  );
};

export const transformCaseRecordsToNewIncidentsDataset = (
  records: CaseRecordsByState,
): Dataset[] => {
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
  return transformCaseRecordsToDataset(newIncidentsByState);
};

export const transformCaseRecordsToMortailityDataset = (
  confirmed: CaseRecordsByState,
  deaths: CaseRecordsByState,
): Dataset[] => {
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

  return transformCaseRecordsToDataset(mortalityByState);
};
