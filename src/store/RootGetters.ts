import { Getters } from 'vuex-smart-module';
import {
  CaseRecordsByState,
  CaseRecordsMap,
  RootState,
} from '@/store/RootState';

export default class RootGetters extends Getters<RootState> {
  public getDataOfLastDayForType(
    type: 'confirmed' | 'deaths',
  ): { [key: string]: number } {
    const rawData = this.state[type];
    const data: { [key: string]: number } = {};
    Object.entries(rawData).forEach(([stateName, days]) => {
      const daysArr = Object.entries(days);
      daysArr.sort((a, b) => (a[0] as any) - (b[0] as any));
      data[stateName] = daysArr[daysArr.length - 1][1];
    });
    return data;
  }

  public selectedDataForType(type: 'confirmed' | 'deaths'): CaseRecordsByState {
    if (this.state.selectedStates.length === 0) {
      return {
        Deutschland: this.getters.summarizeCases(this.state[type]),
      };
    }

    const confirmed: CaseRecordsByState = {};

    this.state.selectedStates.forEach(stateName => {
      confirmed[stateName] = this.state[type][stateName];
    });

    return confirmed;
  }

  public get confirmed(): CaseRecordsByState {
    if (this.state.selectedStates.length === 0) {
      return {
        Deutschland: this.getters.summarizeCases(this.state.confirmed),
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
        Deutschland: this.getters.summarizeCases(this.state.deaths),
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
