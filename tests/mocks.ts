import { ApplicationState, RootState } from '@/store/RootState';

export const getNewRootState = (fields: Partial<RootState>): RootState => {
  return {
    confirmed: {},
    deaths: {},
    statePopulation: {},
    availableDays: [],
    selection: {
      states: [],
      type: 'confirmed',
      subType: 'total',
      day: '',
    },
    ...fields,
  };
};
