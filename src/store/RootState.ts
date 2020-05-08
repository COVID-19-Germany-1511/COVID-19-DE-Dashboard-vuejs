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

export type StatSubType = 'total' | 'perPop';
export type ScaleType = 'linear' | 'logarithmic';

export type State = ProvidedData['states'][number];
export type CaseState = ProvidedData['caseStates'][number];
export type CaseStateName = CaseState['name'];
export type Sex = ProvidedData['sex'][number];
export type Age = ProvidedData['ages'][number];

export interface ApplicationState {
  initialized: boolean;
  status: Status;
  meta: ProvidedData;
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
  meta = (null as any) as ApplicationState['meta'];

  selection: ApplicationState['selection'] = {
    states: [] as State[],
    caseState: 'confirmed',
    subType: 'total',
    day: (null as any) as Date,
    yAxisScaling: 'linear',
    averaged: false,
  };
}
