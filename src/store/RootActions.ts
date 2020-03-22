import { Actions } from 'vuex-smart-module';
import RootGetters from './RootGetters';
import RootMutations from './RootMutations';
import { RootState } from '@/store/RootState';

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

  public selectType(type: 'confirmed' | 'deaths'): void {
    this.commit('selectType', type);
  }

  public selectDay(day: string): void {
    this.commit('selectDay', day);
  }
}
