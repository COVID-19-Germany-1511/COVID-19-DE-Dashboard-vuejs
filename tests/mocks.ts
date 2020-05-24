import { RootState } from '@/store/RootState';
import { BaseArea } from 'covid-19-data-scrapper-germany/src/DataProvider';

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
