import { Actions } from 'vuex-smart-module';
import {
  loadData,
  Status,
  State,
} from 'covid-19-data-scrapper-germany/src/DataProvider';
import RootGetters from './RootGetters';
import RootMutations from './RootMutations';
import {
  RootState,
  StatSubType,
  ScaleType,
  CaseStateName,
} from '@/store/RootState';

export default class RootActions extends Actions<
  RootState,
  RootGetters,
  RootMutations,
  RootActions
> {
  public async loadData(): Promise<void> {
    const setStatus = (status: Status) => {
      this.commit('setStatus', status);
    };
    const data = await loadData(setStatus);
    this.commit('setProvidedData', data);
    const days = data.meta.days;
    this.dispatch('selectDay', days[days.length - 1]);
  }

  public selectStates(states: State[]): void {
    this.commit('setSelectedStates', states);
  }

  public toggleStateSelection(svgId: number): void {
    this.commit('toggleStateSelection', svgId);
  }

  public selectCaseState(payload: {
    caseState: CaseStateName;
    subType: StatSubType;
  }): void {
    this.commit('selectCaseState', payload);
  }

  public selectDay(day: Date): void {
    this.commit('selectDay', day);
  }

  public selectYAxisScaling(scaling: ScaleType): void {
    this.commit('setYAxisScaling', scaling);
  }

  public setChartAveraging(shouldChartsBeAveraged: boolean): void {
    this.commit('setChartAveraging', shouldChartsBeAveraged);
  }
}
