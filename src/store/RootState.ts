import {
  extractCasesFromTimeline,
  extractStatePopulationFromMetaData,
} from './transformations/transformations';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import confirmedData from 'COVID-19-DE/time_series/time-series_19-covid-Confirmed.csv';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import deathsData from 'COVID-19-DE/time_series/time-series_19-covid-Deaths.csv';
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import stateMetaData from 'COVID-19-DE/meta/stateMetaData.csv';

export interface CaseRecordsByState {
  [stateName: string]: {
    [isoDate: string]: number;
  };
}

export interface StatePopulationData {
  [stateName: string]: number;
}

export interface AvailableStatesUIData {
  [stateName: string]: {
    color: string;
  };
}

export interface ApplicationState {
  // availableStates: AvailableStatesUIData;
  // selectedStates: string[];
  statePopulation: StatePopulationData;
  confirmed: CaseRecordsByState;
  deaths: CaseRecordsByState;
}

export class RootState implements ApplicationState {
  confirmed = extractCasesFromTimeline(confirmedData);
  deaths = extractCasesFromTimeline(deathsData);
  statePopulation = extractStatePopulationFromMetaData(stateMetaData);
}
