import RootGetters from '@/store/RootGetters';
import { inject } from 'vuex-smart-module';
import { CaseRecordsByState } from '@/store/RootState';
import { getNewRootState, getNewMockState } from '../../mocks';
import { BaseArea } from 'covid-19-data-scrapper-germany/src/DataProvider';

describe('RootGetters', () => {
  describe('allTimeStateMax', () => {
    it('should calculate the max confirmed of the entire data set', () => {
      const BerlinTestData = getNewMockState({
        population: 3200000,
        total: {
          confirmed: 456,
          deaths: 8,
        },
      });

      const SaxonyTestData = getNewMockState({
        population: 4087500,
        total: {
          confirmed: 654,
          deaths: 4,
        },
      });

      const getters = inject(RootGetters, {
        state: getNewRootState({
          areas: {
            states: [BerlinTestData, SaxonyTestData],
            germany: {} as BaseArea,
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
        }),
      });

      const expectedAllTimeStateMax = {
        total: 654,
        perPop: 16,
      };
      expect(getters.selectedCaseStateAllTimeMax).toStrictEqual(
        expectedAllTimeStateMax,
      );
    });

    it('should calculate the max deaths of the entire data set', () => {
      const BerlinTestData = getNewMockState({
        population: 3200000,
        total: {
          confirmed: 456,
          deaths: 8,
        },
      });

      const SaxonyTestData = getNewMockState({
        population: 4087500,
        total: {
          confirmed: 654,
          deaths: 4,
        },
      });

      const getters = inject(RootGetters, {
        state: getNewRootState({
          areas: {
            states: [BerlinTestData, SaxonyTestData],
            germany: {} as BaseArea,
            counties: [],
          },
          selection: {
            states: [],
            caseState: 'deaths',
            subType: 'total',
            day: new Date(),
            yAxisScaling: 'linear',
            averaged: false,
          },
        }),
      });

      const expectedAllTimeStateMax = {
        total: 8,
        perPop: 0.25,
      };
      expect(getters.selectedCaseStateAllTimeMax).toStrictEqual(
        expectedAllTimeStateMax,
      );
    });
  });

  describe('selectedDataForType', () => {
    it.each([['confirmed'], ['deaths']] as const)(
      'should return the data with argument "%s" and dates adjusted to German locale',
      type => {
        const testdata: Map<Date, [number, number]> = new Map([
          [new Date('2020-03-14'), [0, 123]],
          [new Date('2020-03-15'), [0, 456]],
        ]);
        const getDataRow = jest.fn().mockReturnValue(testdata);
        const mockStateDate = getNewMockState({
          de: 'Berlin',
          getDataRow,
        });
        // eslint-disable-next-line  @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        const getters = inject(RootGetters, {
          state: getNewRootState({
            meta: {
              lastUpdated: new Date(0),
              sex: [],
              ages: [],
              caseStates: [],
              days: Array.from(testdata.keys()),
            },
          }),
          getters: {
            selectedAreas: [mockStateDate],
          },
        });

        const expectedCases: CaseRecordsByState = {
          Berlin: {
            '14.3.2020': 123,
            '15.3.2020': 456,
          },
        };

        expect(getters.selectedDataForType(type)).toStrictEqual(expectedCases);
        expect(getDataRow).toHaveBeenCalledWith(type);
      },
    );
  });
});
