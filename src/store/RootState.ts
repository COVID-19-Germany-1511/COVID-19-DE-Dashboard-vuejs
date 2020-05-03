import {
  extractCasesFromTimeline,
  extractStatePopulationFromMetaData,
  extractDatesFromTimeline,
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
import {
  ProvidedData,
  Status,
} from 'covid-19-data-scrapper-germany/src/DataProvider';

export interface CaseRecordsMap {
  [isoDate: string]: number;
}

export interface CaseRecordsByState {
  [stateName: string]: CaseRecordsMap;
}

export interface StatePopulationData {
  [stateName: string]: number;
}

export type StatType = 'confirmed' | 'deaths';
export type StatSubType = 'total' | 'perPop' | 'change';
export type ScaleType = 'linear' | 'logarithmic';

export interface ApplicationState {
  selection: {
    states: string[];
    type: StatType;
    subType: StatSubType;
    date: string;
    yAxisScaling: ScaleType;
    averaged: boolean;
  };
  statePopulation: StatePopulationData;
  confirmed: CaseRecordsByState;
  deaths: CaseRecordsByState;
  status: Status;
  meta: ProvidedData['meta'] | null;
  data: ProvidedData['data'] | null;
}

export class RootState implements ApplicationState {
  confirmed = extractCasesFromTimeline(confirmedData);
  deaths = extractCasesFromTimeline(deathsData);
  statePopulation = extractStatePopulationFromMetaData(stateMetaData);
  availableDates = extractDatesFromTimeline(confirmedData);
  status = 'start' as Status;
  meta = null as ApplicationState['meta'];
  data = null as ApplicationState['data'];

  selection: ApplicationState['selection'] = {
    states: [] as string[],
    type: 'confirmed',
    subType: 'total',
    date: this.availableDates[this.availableDates.length - 1],
    yAxisScaling: 'linear',
    averaged: false,
  };
}
