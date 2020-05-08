import { RootState } from '@/store/RootState';

export const getNewRootState = (fields: Partial<RootState>): RootState => {
  return {
    initialized: true,
    status: 'ready',
    meta: {} as RootState['meta'],
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
