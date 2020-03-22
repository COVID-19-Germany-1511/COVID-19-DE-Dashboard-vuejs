import RootGetters from '@/store/RootGetters';
import { inject } from 'vuex-smart-module';
import { CaseRecordsByState } from '@/store/RootState';

describe('RootGetters', () => {
  describe('confirmed', () => {
    it('should return totals if selectedStates is empty', () => {
      const getters = inject(RootGetters, {
        state: {
          selection: {
            states: [],
            type: 'confirmed',
            subType: 'total',
            day: '',
          },
          confirmed: {
            Sachsen: {
              '2020-03-14': 321,
              '2020-03-15': 654,
            },
            Berlin: {
              '2020-03-14': 123,
              '2020-03-15': 456,
            },
          },
          deaths: {},
          statePopulation: {},
          availableDays: [],
        },
      });

      const expectedTotalCases: CaseRecordsByState = {
        Deutschland: {
          '2020-03-14': 444,
          '2020-03-15': 1110,
        },
      };

      expect(getters.selectedDataForType('confirmed')).toStrictEqual(
        expectedTotalCases,
      );
    });

    it('should return only the data for the selectedStates', () => {
      const getters = inject(RootGetters, {
        state: {
          selection: {
            states: ['Berlin'],
            type: 'confirmed',
            subType: 'total',
            day: '',
          },
          confirmed: {
            Sachsen: {
              '2020-03-14': 321,
              '2020-03-15': 654,
            },
            Berlin: {
              '2020-03-14': 123,
              '2020-03-15': 456,
            },
          },
          deaths: {},
          statePopulation: {},
          availableDays: [],
        },
      });

      const expectedCases: CaseRecordsByState = {
        Berlin: {
          '2020-03-14': 123,
          '2020-03-15': 456,
        },
      };

      expect(getters.selectedDataForType('confirmed')).toStrictEqual(
        expectedCases,
      );
    });
  });

  describe('deaths', () => {
    it('should return totals if selectedStates is empty', () => {
      const getters = inject(RootGetters, {
        state: {
          selection: {
            states: [],
            type: 'confirmed',
            subType: 'total',
            day: '',
          },
          deaths: {
            Sachsen: {
              '2020-03-14': 3,
              '2020-03-15': 4,
            },
            Berlin: {
              '2020-03-14': 4,
              '2020-03-15': 5,
            },
          },
          confirmed: {},
          statePopulation: {},
          availableDays: [],
        },
      });

      const expectedTotalDeaths: CaseRecordsByState = {
        Deutschland: {
          '2020-03-14': 7,
          '2020-03-15': 9,
        },
      };

      expect(getters.selectedDataForType('deaths')).toStrictEqual(
        expectedTotalDeaths,
      );
    });

    it('should return only the data for the selectedStates', () => {
      const getters = inject(RootGetters, {
        state: {
          selection: {
            states: ['Berlin'],
            type: 'confirmed',
            subType: 'total',
            day: '',
          },
          deaths: {
            Sachsen: {
              '2020-03-14': 3,
              '2020-03-15': 4,
            },
            Berlin: {
              '2020-03-14': 4,
              '2020-03-15': 5,
            },
          },
          confirmed: {},
          statePopulation: {},
          availableDays: [],
        },
      });

      const expectedDeaths: CaseRecordsByState = {
        Berlin: {
          '2020-03-14': 4,
          '2020-03-15': 5,
        },
      };

      expect(getters.selectedDataForType('deaths')).toStrictEqual(
        expectedDeaths,
      );
    });
  });
});
