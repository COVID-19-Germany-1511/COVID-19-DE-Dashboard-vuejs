<template>
  <div>
    <h2>Mortalität (CFR)</h2>
    <PercentageLinear :chart-data="this.chartData" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import {
  transformCaseRecordsToChartData,
  transformCaseRecordsToMortaility,
} from '@/lib/transformations/transformToDatasets';
import StateMixin from '@/components/stateMixin';
import PercentageLinear from '@/components/charts/PercentageLinear';
import { hydrateDatasetsWithColor } from '@/lib/colors';
import { ChartData } from 'chart.js';

@Component({
  components: { PercentageLinear },
})
export default class Mortality extends mixins(StateMixin) {
  public get dates(): string[] {
    return Object.keys(Object.values(this.rootModule.getters.confirmed)[0]);
  }

  public get chartData(): ChartData {
    const mortailityRecords = transformCaseRecordsToMortaility(
      this.rootModule.getters.confirmed,
      this.rootModule.getters.deaths,
    );
    const chartData = transformCaseRecordsToChartData(mortailityRecords);

    chartData.datasets = hydrateDatasetsWithColor(chartData.datasets);
    return chartData;
  }
}
</script>

<style lang="scss"></style>
