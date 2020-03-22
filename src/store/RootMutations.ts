import { Mutations } from 'vuex-smart-module';
import { RootState } from '@/store/RootState';

export default class RootMutations extends Mutations<RootState> {
  public setSelectedStates(stateNames: string[]): void {
    this.state.selection.states = stateNames;
  }

  public toggleStateSelection(stateName: string): void {
    const { states } = this.state.selection as { states: string[] };
    const idx = states.findIndex(name => name === stateName);
    if (idx >= 0) {
      states.splice(idx, 1);
    } else {
      states.push(stateName);
    }
  }

  public selectType(type: 'confirmed' | 'deaths'): void {
    this.state.selection.type = type;
  }
}
