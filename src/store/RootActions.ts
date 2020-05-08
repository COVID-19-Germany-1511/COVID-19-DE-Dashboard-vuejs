import { Actions } from 'vuex-smart-module';
import RootGetters from './RootGetters';
import RootMutations from './RootMutations';
import { RootState, StatType, StatSubType, ScaleType } from '@/store/RootState';
import { updateWindowLocation } from '@/lib/windowLocation';

export default class RootActions extends Actions<
  RootState,
  RootGetters,
  RootMutations,
  RootActions
> {
  public selectStates(stateNames: string[]): void {
    this.commit('setSelectedStates', stateNames);
    updateWindowLocation(this.state.selection); // FIXME: figure out which of those to is actually used
  }

  public toggleStateSelection(stateName: string): void {
    this.commit('toggleStateSelection', stateName);
    updateWindowLocation(this.state.selection);
  }

  public selectType(payload: { type: StatType; subType: StatSubType }): void {
    this.commit('selectType', payload);
  }

  public selectDate(date: string): void {
    this.commit('selectDate', date);
  }

  public selectYAxisScaling(scaling: ScaleType): void {
    this.commit('setYAxisScaling', scaling);
    updateWindowLocation(this.state.selection);
  }

  public setChartAveraging(shouldChartsBeAveraged: boolean): void {
    this.commit('setChartAveraging', shouldChartsBeAveraged);
    updateWindowLocation(this.state.selection);
  }
}
