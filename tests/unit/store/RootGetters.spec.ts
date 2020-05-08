// import RootGetters from '@/store/RootGetters';
// import { inject } from 'vuex-smart-module';
// import { CaseRecordsByState } from '@/store/RootState';
// import { getNewRootState } from '../../mocks';

// describe('RootGetters', () => {
//   describe('allTimeStateMax', () => {
//     it('should calculate the max stats of the entire data set', () => {
//       const getters = inject(RootGetters, {
//         state: getNewRootState({
//           confirmed: {
//             Sachsen: {
//               '2020-03-14': 321,
//               '2020-03-15': 654,
//             },
//             Berlin: {
//               '2020-03-14': 123,
//               '2020-03-15': 456,
//             },
//           },
//           deaths: {
//             Sachsen: {
//               '2020-03-14': 3,
//               '2020-03-15': 4,
//             },
//             Berlin: {
//               '2020-03-14': 4,
//               '2020-03-15': 8,
//             },
//           },
//           statePopulation: {
//             Sachsen: 4087500,
//             Berlin: 3200000,
//           },
//           selection: {
//             states: [],
//             type: 'confirmed',
//             subType: 'total',
//             date: '',
//             yAxisScaling: 'linear',
//             averaged: false,
//           },
//         }),
//       });

//       const expectedAllTimeStateMax = {
//         confirmed: {
//           total: 654,
//           perPop: 16,
//           change: 0,
//         },
//         deaths: {
//           total: 8,
//           perPop: 0.25,
//           change: 0,
//         },
//       };
//       expect(getters.allTimeStateMax).toStrictEqual(expectedAllTimeStateMax);
//     });
//   });

//   describe('selectedDataForType', () => {
//     describe('with the argument "confirmed"', () => {
//       it('should return totals if selectedStates is empty', () => {
//         const getters = inject(RootGetters, {
//           state: getNewRootState({
//             confirmed: {
//               Sachsen: {
//                 '2020-03-14': 321,
//                 '2020-03-15': 654,
//               },
//               Berlin: {
//                 '2020-03-14': 123,
//                 '2020-03-15': 456,
//               },
//             },
//             selection: {
//               states: [],
//               type: 'confirmed',
//               subType: 'total',
//               date: '',
//               yAxisScaling: 'linear',
//               averaged: false,
//             },
//           }),
//         });

//         const expectedTotalCases: CaseRecordsByState = {
//           Deutschland: {
//             '2020-03-14': 444,
//             '2020-03-15': 1110,
//           },
//         };

//         expect(getters.selectedDataForType('confirmed')).toStrictEqual(
//           expectedTotalCases,
//         );
//       });

//       it('should return only the data for the selectedStates', () => {
//         const getters = inject(RootGetters, {
//           state: getNewRootState({
//             confirmed: {
//               Sachsen: {
//                 '2020-03-14': 321,
//                 '2020-03-15': 654,
//               },
//               Berlin: {
//                 '2020-03-14': 123,
//                 '2020-03-15': 456,
//               },
//             },
//             selection: {
//               states: ['Berlin'],
//               type: 'confirmed',
//               subType: 'total',
//               date: '',
//               yAxisScaling: 'linear',
//               averaged: false,
//             },
//           }),
//         });

//         const expectedCases: CaseRecordsByState = {
//           Berlin: {
//             '2020-03-14': 123,
//             '2020-03-15': 456,
//           },
//         };

//         expect(getters.selectedDataForType('confirmed')).toStrictEqual(
//           expectedCases,
//         );
//       });
//     });

//     describe('with the argument "deaths"', () => {
//       it('should return totals if selectedStates is empty', () => {
//         const getters = inject(RootGetters, {
//           state: getNewRootState({
//             deaths: {
//               Sachsen: {
//                 '2020-03-14': 3,
//                 '2020-03-15': 4,
//               },
//               Berlin: {
//                 '2020-03-14': 4,
//                 '2020-03-15': 5,
//               },
//             },
//             selection: {
//               states: [],
//               type: 'confirmed',
//               subType: 'total',
//               date: '',
//               yAxisScaling: 'linear',
//               averaged: false,
//             },
//           }),
//         });

//         const expectedTotalDeaths: CaseRecordsByState = {
//           Deutschland: {
//             '2020-03-14': 7,
//             '2020-03-15': 9,
//           },
//         };

//         expect(getters.selectedDataForType('deaths')).toStrictEqual(
//           expectedTotalDeaths,
//         );
//       });

//       it('should return only the data for the selectedStates', () => {
//         const getters = inject(RootGetters, {
//           state: getNewRootState({
//             selection: {
//               states: ['Berlin'],
//               type: 'confirmed',
//               subType: 'total',
//               date: '',
//               yAxisScaling: 'linear',
//               averaged: false,
//             },
//             deaths: {
//               Sachsen: {
//                 '2020-03-14': 3,
//                 '2020-03-15': 4,
//               },
//               Berlin: {
//                 '2020-03-14': 4,
//                 '2020-03-15': 5,
//               },
//             },
//           }),
//         });

//         const expectedDeaths: CaseRecordsByState = {
//           Berlin: {
//             '2020-03-14': 4,
//             '2020-03-15': 5,
//           },
//         };

//         expect(getters.selectedDataForType('deaths')).toStrictEqual(
//           expectedDeaths,
//         );
//       });
//     });
//   });
// });
