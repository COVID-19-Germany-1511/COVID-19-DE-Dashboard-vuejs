import { CaseRecordsByState, StatePopulationData } from '@/store/RootState';

export interface TimelineDataRecord {
  State: string;
  [isoDate: string]: number | string; // actually always a number but that makes typescript unhappy
}

export const extractCasesFromTimeline = (
  timelineData: TimelineDataRecord[],
): CaseRecordsByState => {
  // ToDo: add checks that data has actually the right format
  const records: CaseRecordsByState = {};

  timelineData.forEach((stateData: TimelineDataRecord) => {
    const stateName = stateData.State;
    if (!records[stateName]) {
      records[stateName] = {};
    }
    for (const key in stateData) {
      if (key === 'State') {
        continue;
      }
      records[stateName][key] = stateData[key] as number;
    }
  });

  return records;
};

export interface MetaDataRecord {
  State: string;
  Population: number;
}

export const extractStatePopulationFromMetaData = (
  metaData: MetaDataRecord[],
): StatePopulationData => {
  // ToDo: add checks that data has actually the right format
  const statePopulationData: StatePopulationData = {};

  metaData.forEach((stateMetaData: MetaDataRecord) => {
    statePopulationData[stateMetaData.State] = stateMetaData.Population;
  });

  return statePopulationData;
};
