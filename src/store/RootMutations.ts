import { Mutations } from 'vuex-smart-module';
import {
  RootState,
  StatSubType,
  ApplicationState,
  State,
  CaseStateName,
} from '@/store/RootState';

export default class RootMutations extends Mutations<RootState> {
  public setMeta(meta: NonNullable<ApplicationState['meta']>): void {
    this.state.meta = meta;
    this.state.initialized = true;
  }

  public setStatus(status: ApplicationState['status']): void {
    this.state.status = status;
  }

  public setSelectedStates(states: State[]): void {
    states.sort((a, b) => a.id - b.id);
    this.state.selection.states = states;
  }

  public toggleStateSelection(_svgId: number): void {
    const { states } = this.state.selection;
    const state = this.state.meta.states.find(
      ({ svgId }) => svgId === _svgId,
    ) as State;
    const idx = states.indexOf(state);
    if (idx >= 0) {
      states.splice(idx, 1);
    } else {
      states.push(state);
      states.sort((a, b) => a.id - b.id);
    }
  }

  public selectCaseState({
    caseState,
    subType,
  }: {
    caseState: CaseStateName;
    subType: StatSubType;
  }): void {
    this.state.selection.caseState = caseState;
    this.state.selection.subType = subType;
  }

  public selectDay(day: Date): void {
    this.state.selection.day = day;
  }

  public setYAxisScaling(scaling: 'linear' | 'logarithmic'): void {
    this.state.selection.yAxisScaling = scaling;
  }

  public setChartAveraging(shouldChartsBeAveraged: boolean): void {
    this.state.selection.averaged = shouldChartsBeAveraged;
  }
}
