import { Actions } from 'vuex-smart-module';
import RootGetters from './RootGetters';
import RootMutations from './RootMutations';
import { RootState, StatType, StatSubType, ScaleType } from '@/store/RootState';

export default class RootActions extends Actions<
  RootState,
  RootGetters,
  RootMutations,
  RootActions
> {
  public selectStates(stateNames: string[]): void {
    this.commit('setSelectedStates', stateNames);
  }

  public toggleStateSelection(stateName: string): void {
    this.commit('toggleStateSelection', stateName);
  }

  public selectType(payload: { type: StatType; subType: StatSubType }): void {
    this.commit('selectType', payload);
  }

  public selectDate(date: string): void {
    this.commit('selectDate', date);
  }

  public selectYAxisScaling(scaling: ScaleType): void {
    this.commit('setYAxisScaling', scaling);
  }

  public setChartAveraging(shouldChartsBeAveraged: boolean): void {
    this.commit('setChartAveraging', shouldChartsBeAveraged);
  }
}
