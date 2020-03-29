import { Mutations } from 'vuex-smart-module';
import { RootState, StatType, StatSubType } from '@/store/RootState';

export default class RootMutations extends Mutations<RootState> {
  public setSelectedStates(stateNames: string[]): void {
    this.state.selection.states = stateNames;
    this.state.selection.states.sort();
  }

  public toggleStateSelection(stateName: string): void {
    const { states } = this.state.selection as { states: string[] };
    const idx = states.findIndex(name => name === stateName);
    if (idx >= 0) {
      states.splice(idx, 1);
    } else {
      states.push(stateName);
      states.sort();
    }
  }

  public selectType({
    type,
    subType,
  }: {
    type: StatType;
    subType: StatSubType;
  }): void {
    this.state.selection.type = type;
    this.state.selection.subType = subType;
  }

  public selectDate(date: string): void {
    this.state.selection.date = date;
  }

  public setYAxisScaling(scaling: 'linear' | 'logarithmic'): void {
    this.state.selection.yAxisScaling = scaling;
  }

  public setChartAveraging(shouldChartsBeAveraged: boolean): void {
    this.state.selection.averaged = shouldChartsBeAveraged;
  }
}
