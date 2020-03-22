import {
  extractCasesFromTimeline,
  extractStatePopulationFromMetaData,
  extractDaysFromTimeline,
} from '@/lib/transformations/transformations';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import confirmedData from 'COVID-19-DE/time_series/time-series_19-covid-Confirmed.csv';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import deathsData from 'COVID-19-DE/time_series/time-series_19-covid-Deaths.csv';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import stateMetaData from 'COVID-19-DE/meta/stateMetaData.csv';

export interface CaseRecordsMap {
  [isoDate: string]: number;
}

export interface CaseRecordsByState {
  [stateName: string]: CaseRecordsMap;
}

export interface StatePopulationData {
  [stateName: string]: number;
}

export interface AvailableStatesUIData {
  [stateName: string]: {
    color: string;
  };
}

export type StatType = 'confirmed' | 'deaths';

export interface ApplicationState {
  // availableStates: AvailableStatesUIData;
  selection: {
    states: string[];
    type: StatType;
    day: string;
  };
  statePopulation: StatePopulationData;
  confirmed: CaseRecordsByState;
  deaths: CaseRecordsByState;
}

export class RootState implements ApplicationState {
  confirmed = extractCasesFromTimeline(confirmedData);
  deaths = extractCasesFromTimeline(deathsData);
  statePopulation = extractStatePopulationFromMetaData(stateMetaData);
  availableDays = extractDaysFromTimeline(confirmedData);

  selection: ApplicationState['selection'] = {
    states: [] as string[],
    type: 'confirmed',
    day: this.availableDays[this.availableDays.length - 1],
  };
}
