import { RootState } from '@/store/RootState';

export const getNewRootState = (fields: Partial<RootState>): RootState => {
  return {
    confirmed: {},
    deaths: {},
    statePopulation: {},
    availableDates: [],
    selection: {
      states: [],
      type: 'confirmed',
      subType: 'total',
      date: '',
    },
    ...fields,
  };
};
