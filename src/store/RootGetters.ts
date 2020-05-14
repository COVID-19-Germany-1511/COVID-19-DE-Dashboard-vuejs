import { Getters } from 'vuex-smart-module';
import i18n from '@/i18n';
import {
  CaseRecordsByState,
  CaseRecordsMap,
  RootState,
  CaseStateName,
  StatSubType,
} from '@/store/RootState';
import { BaseArea } from 'covid-19-data-scrapper-germany/src/DataProvider';

export default class RootGetters extends Getters<RootState> {
  public get selectedAreas(): BaseArea[] {
    if (!this.state.meta) {
      return [];
    }
    const { states } = this.state.selection;
    return states.length ? states : [this.state.areas.germany];
  }

  public get selectedAreasMeta(): Pick<BaseArea, 'area' | 'population'> {
    return this.getters.selectedAreas.reduce(
      (summed, { area, population }) => {
        summed.area += area;
        summed.population += population;
        return summed;
      },
      { area: 0, population: 0 },
    );
  }

  public get dataOfDayAndAreas() {
    const { day } = this.state.selection;
    return {
      confirmed: this.getters.getData('confirmed', day as Date)[1],
      deaths: this.getters.getData('deaths', day as Date)[1],
    };
  }

  /* eslint-disable prettier/prettier */
  // prettier-ignore
  public get dataOfDayAndCaseState(): Map<
    BaseArea,
    Record<StatSubType, number>
    > {
    /* eslint-enable prettier/prettier */
    const { day, caseState } = this.state.selection;
    const result = new Map<BaseArea, Record<StatSubType, number>>();
    this.state.areas.states.forEach(state => {
      const data = state.getDataRow(caseState).get(day) as [number, number];
      const total = data[1];
      const perPop = (total * 100000) / state.population;
      result.set(state, { total, perPop });
    });
    return result;
  }

  public get selectedCaseStateAllTimeMax(): Record<StatSubType, number> {
    const { caseState } = this.state.selection;
    return this.state.areas.states
      .map(state => {
        const total = state.total[caseState];
        const perPop = (total * 100000) / state.population;
        return { total, perPop };
      })
      .reduce(
        (maxes, { total, perPop }) => {
          maxes.total = Math.max(maxes.total, total);
          maxes.perPop = Math.max(maxes.perPop, perPop);
          return maxes;
        },
        { total: 0, perPop: 0 },
      );
  }

  public getData(type: CaseStateName, day: Date): [number, number] {
    return this.getters.selectedAreas
      .map(({ getDataRow }) => getDataRow(type).get(day) as [number, number])
      .reduce(
        (summed, current) => {
          summed[0] += current[0];
          summed[1] += current[1];
          return summed;
        },
        [0, 0],
      );
  }

  public selectedDataForType(type: CaseStateName): CaseRecordsByState {
    const map: CaseRecordsByState = {};
    const days = this.state.meta?.days;
    if (!days) {
      return map;
    }
    this.getters.selectedAreas.forEach(state => {
      const data = state.getDataRow(type);
      const mappedState: CaseRecordsMap = {};
      days.forEach(day => {
        const date = i18n.d(day);
        mappedState[date] = (data.get(day) as [number, number])[1];
      });
      map[state.de] = mappedState;
    });

    return map;
  }
}
