import { Getters } from 'vuex-smart-module';
import {
  CaseRecordsByState,
  CaseRecordsMap,
  RootState,
} from '@/store/RootState';

export default class RootGetters extends Getters<RootState> {
  public get confirmed(): CaseRecordsByState {
    if (this.state.selectedStates.length === 0) {
      return {
        Deutschland: this.summarizeCases(this.state.confirmed),
      };
    }

    const confirmed: CaseRecordsByState = {};

    this.state.selectedStates.forEach(stateName => {
      confirmed[stateName] = this.state.confirmed[stateName];
    });

    return confirmed;
  }

  public get deaths(): CaseRecordsByState {
    if (this.state.selectedStates.length === 0) {
      return {
        Deutschland: this.summarizeCases(this.state.deaths),
      };
    }

    const deaths: CaseRecordsByState = {};

    this.state.selectedStates.forEach(stateName => {
      deaths[stateName] = this.state.deaths[stateName];
    });

    return deaths;
  }

  private summarizeCases(cases: CaseRecordsByState): CaseRecordsMap {
    const totalCases: CaseRecordsMap = {};

    Object.values(cases).forEach((stateData: CaseRecordsMap) => {
      Object.entries(stateData).forEach(([date, cases]) => {
        if (!totalCases[date]) {
          totalCases[date] = 0;
        }
        totalCases[date] += cases;
      });
    });

    return totalCases;
  }
}
