import { Mutations } from 'vuex-smart-module';
import { RootState } from '@/store/RootState';

export default class RootMutations extends Mutations<RootState> {
  public setSelectedStates(stateNames: string[]): void {
    this.state.selectedStates = stateNames;
  }
}
