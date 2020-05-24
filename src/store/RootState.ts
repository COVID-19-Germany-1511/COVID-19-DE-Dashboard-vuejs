import {
  ProvidedData,
  Status,
  BaseArea,
  County,
  State,
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

export type StatSubType = 'total' | 'perPop';
export type ScaleType = 'linear' | 'logarithmic';

export type CaseState = ProvidedData['meta']['caseStates'][number];
export type CaseStateName = CaseState['name'];
export type Sex = ProvidedData['meta']['sex'][number];
export type Age = ProvidedData['meta']['ages'][number];

export interface ApplicationState {
  initialized: boolean;
  status: Status;
  meta: ProvidedData['meta'];
  areas: ProvidedData['areas'];
  selection: {
    states: State[];
    caseState: CaseStateName;
    subType: StatSubType;
    day: Date;
    yAxisScaling: ScaleType;
    averaged: boolean;
  };
}

export class RootState implements ApplicationState {
  initialized = false;
  status = 'start' as Status;
  meta = {
    days: [] as Date[],
    sex: [] as Sex[],
    ages: [] as Age[],
    caseStates: [] as CaseState[],
    lastUpdated: new Date(0),
  };

  areas = {
    germany: {} as BaseArea,
    states: [] as State[],
    counties: [] as County[],
  };

  selection: ApplicationState['selection'] = {
    states: [] as State[],
    caseState: 'confirmed',
    subType: 'total',
    day: (null as any) as Date,
    yAxisScaling: 'linear',
    averaged: false,
  };
}
