<template>
  <div :id="chartId">
    <ChartHeading i18n-key="titles.mortality" :id="chartId" />
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
import ChartHeading from '@/components/misc/ChartHeading.vue';
import CasesLinear from '@/components/charts/CasesLinear';

@Component({
  components: { ChartHeading, PercentageLinear },
})
export default class Mortality extends mixins(StateMixin) {
  public get chartId(): string {
    return 'mortality';
  }

  public get chartData(): ChartData {
    const mortailityRecords = transformCaseRecordsToMortaility(
      this.rootModule.getters.selectedDataForType('confirmed'),
      this.rootModule.getters.selectedDataForType('deaths'),
    );
    const chartData = transformCaseRecordsToChartData(mortailityRecords);

    chartData.datasets = hydrateDatasetsWithColor(chartData.datasets);
    return chartData;
  }
}
</script>

<style lang="scss"></style>
