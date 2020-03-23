import { Getters } from 'vuex-smart-module';
import {
  CaseRecordsByState,
  CaseRecordsMap,
  RootState,
  StatType,
  StatSubType,
} from '@/store/RootState';

function summarizeCases(cases: CaseRecordsByState): CaseRecordsMap {
  const totalCases: CaseRecordsMap = {};

  Object.values(cases).forEach((stateData: CaseRecordsMap) => {
    Object.entries(stateData).forEach(([date, cases]) => {
      if (!totalCases[date]) {
        totalCases[date] = 0;
      }
      totalCases[date] += cases;
    });
  });

  return totalCases;
}
export default class RootGetters extends Getters<RootState> {
  public get allTimeStateMax() {
    const { statePopulation } = this.state;
    function getMax(
      records: CaseRecordsByState,
    ): { [key in StatSubType]: number } {
      const statesMaxTotal = Object.values(records).map(days => {
        return Math.max(...Object.values(days));
      });
      const statesMaxProPop = Object.entries(records).map(
        ([stateName, days]) => {
          const population = statePopulation[stateName];
          return Math.max(
            ...Object.values(days).map(value => (value * 100000) / population),
          );
        },
      );
      return {
        total: Math.max(...statesMaxTotal),
        perPop: Math.max(...statesMaxProPop),
        change: 0,
      };
    }
    return {
      confirmed: getMax(this.state.confirmed),
      deaths: getMax(this.state.deaths),
    };
  }

  public get selectedAllTimeStateMax() {
    return this.getters.allTimeStateMax[this.state.selection.type];
  }

  public get selectedStatesMeta() {
    const { statePopulation } = this.state;
    let {
      selection: { states },
    } = this.state;
    if (!states.length) {
      states = Object.keys(statePopulation);
    }
    const population = states
      .map(stateName => {
        return statePopulation[stateName];
      })
      .reduce((sum, cur) => sum + cur);
    return { population };
  }

  public get dataOfDateAndStates() {
    const { date, states } = this.state.selection;
    return {
      confirmed: this.getters.getData('confirmed', date, states),
      deaths: this.getters.getData('deaths', date, states),
    };
  }

  public get dataOfDateAndType() {
    const {
      statePopulation,
      selection: { date, type },
    } = this.state;
    const result: { [key: string]: { [key in StatSubType]: number } } = {};
    Object.entries(this.state[type]).forEach(
      ([stateName, dates]: [string, { [key: string]: number }]) => {
        const value = dates[date];
        const population = statePopulation[stateName];
        result[stateName] = {
          total: value,
          perPop: (value * 100000) / population,
          change: 0,
        };
      },
    );
    return result;
  }

  public isStateSelected(state: string) {
    return this.state.selection.states.includes(state);
  }

  public getData(type: StatType, date: string, states?: string[]) {
    if (!states || !states.length) {
      states = Object.keys(this.state[type]);
    }
    return states
      .map(stateName => {
        return this.state[type][stateName][date];
      })
      .reduce((sum, cur) => sum + cur);
  }

  public selectedDataForType(type: StatType): CaseRecordsByState {
    const {
      selection: { states },
    } = this.state;
    if (!states.length) {
      return {
        Deutschland: summarizeCases(this.state[type]),
      };
    }

    const confirmed: CaseRecordsByState = {};

    states.forEach(stateName => {
      confirmed[stateName] = this.state[type][stateName];
    });

    return confirmed;
  }
}
