import { Mutations } from 'vuex-smart-module';
import { RootState } from '@/store/RootState';

export default class RootMutations extends Mutations<RootState> {
  public setSelectedStates(stateNames: string[]): void {
    this.state.selectedStates = stateNames;
  }

  public toggleStateSelection(stateName: string): void {
    const { selectedStates } = this.state as { selectedStates: string[] };
    const idx = selectedStates.findIndex(name => name === stateName);
    if (idx >= 0) {
      selectedStates.splice(idx, 1);
    } else {
      selectedStates.push(stateName);
    }
  }
}
