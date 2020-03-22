import { Getters } from 'vuex-smart-module';
import {
  CaseRecordsByState,
  CaseRecordsMap,
  RootState,
  StatType,
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
  public get selectedStatesMeta() {
    const {
      statePopulation,
      selection: { states },
    } = this.state;
    const population = states
      .map(stateName => {
        return statePopulation[stateName];
      })
      .reduce((sum, cur) => sum + cur);
    return { population };
  }

  public get dataOfDayAndStates() {
    const { day, states } = this.state.selection;
    return {
      confirmed: this.getters.getData('confirmed', day, states),
      deaths: this.getters.getData('deaths', day, states),
    };
  }

  public get dataOfDayAndType(): { [key: string]: number } {
    const { day, type } = this.state.selection;
    const result: { [key: string]: number } = {};
    Object.entries(this.state[type]).forEach(
      ([stateName, days]: [string, { [key: string]: number }]) => {
        result[stateName] = days[day];
      },
    );
    return result;
  }

  public getData(type: StatType, day: string, states: string[]) {
    if (!states.length) {
      states = Object.keys(this.state[type]);
    }
    return states
      .map(stateName => {
        return this.state[type][stateName][day];
      })
      .reduce((sum, cur) => sum + cur);
  }

  public getDataOfLastDayForType(type: StatType): { [key: string]: number } {
    const rawData = this.state[type];
    const data: { [key: string]: number } = {};
    Object.entries(rawData).forEach(([stateName, days]) => {
      const daysArr = Object.entries(days);
      daysArr.sort((a, b) => (a[0] as any) - (b[0] as any));
      data[stateName] = daysArr[daysArr.length - 1][1];
    });
    return data;
  }

  public selectedDataForType(type: 'confirmed' | 'deaths'): CaseRecordsByState {
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

  public get confirmed(): CaseRecordsByState {
    const {
      selection: { states },
    } = this.state;
    if (!states.length) {
      return {
        Deutschland: summarizeCases(this.state.confirmed),
      };
    }

    const confirmed: CaseRecordsByState = {};

    states.forEach(stateName => {
      confirmed[stateName] = this.state.confirmed[stateName];
    });

    return confirmed;
  }

  public get deaths(): CaseRecordsByState {
    const {
      selection: { states },
    } = this.state;
    if (!states.length) {
      return {
        Deutschland: summarizeCases(this.state.deaths),
      };
    }

    const deaths: CaseRecordsByState = {};

    states.forEach(stateName => {
      deaths[stateName] = this.state.deaths[stateName];
    });

    return deaths;
  }
}
