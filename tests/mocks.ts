import { RootState } from '@/store/RootState';
import {
  BaseArea,
  State,
} from 'covid-19-data-scrapper-germany/src/DataProvider';

export const getNewRootState = (fields: Partial<RootState>): RootState => {
  return {
    initialized: true,
    status: 'ready',
    meta: {
      lastUpdated: new Date(0),
      sex: [],
      ages: [],
      caseStates: [],
      days: [],
    },
    areas: {
      germany: {} as BaseArea,
      states: [],
      counties: [],
    },
    selection: {
      states: [],
      caseState: 'confirmed',
      subType: 'total',
      day: new Date(),
      yAxisScaling: 'linear',
      averaged: false,
    },
    ...fields,
  };
};

export const getNewMockState = (fields?: Partial<State>): State => ({
  id: 0,
  svgId: 0,
  de: 'GenericState',
  area: 1,
  population: 1,
  total: {
    confirmed: 2,
    deaths: 1,
  },
  records: {
    confirmed: [],
    deaths: [],
  },
  counties: [],
  getDataRow: jest.fn(),
  ...fields,
});
