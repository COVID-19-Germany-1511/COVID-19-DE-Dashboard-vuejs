<template>
  <ChartCard chart-id="mortality" title-i18n-key="titles.mortality">
    <template v-slot:chart>
      <PercentageLinear :chart-data="chartData" />
    </template>
  </ChartCard>
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
import ChartCard from '@/components/charts/ChartCard.vue';

@Component({
  components: { ChartCard, PercentageLinear },
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
