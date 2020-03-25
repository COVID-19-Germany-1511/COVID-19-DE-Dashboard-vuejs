<template>
  <div>
    <h2 v-t="{ path: `titles.growthFactor.${this.type}` }" />
    <CasesLinear :chart-data="this.chartData" />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import CasesLinear from '@/components/charts/CasesLinear';
import {
  calculateGrowthFactorFromNewIncidentsRecords,
  transformCaseRecordsToChartData,
  transformCaseRecordsToNewIncidentsRecords,
} from '@/lib/transformations/transformToDatasets';
import { hydrateDatasetsWithColor } from '@/lib/colors';
import { mixins } from 'vue-class-component';
import StateMixin from '@/components/stateMixin';
import { ChartData } from 'chart.js';
import { StatType } from '@/store/RootState';

@Component({
  components: { CasesLinear },
})
export default class GrowthFactor extends mixins(StateMixin) {
  @Prop({ required: true })
  public type!: StatType;

  public get chartData(): ChartData {
    const newIncidentsRecords = transformCaseRecordsToNewIncidentsRecords(
      this.rootModule.getters.selectedDataForType(this.type),
    );

    const growthFactorRecords = calculateGrowthFactorFromNewIncidentsRecords(
      newIncidentsRecords,
    );

    // Todo: find a correct way to average this
    const chartData = transformCaseRecordsToChartData(growthFactorRecords);

    chartData.datasets = hydrateDatasetsWithColor(
      chartData.datasets,
      this.type,
    );
    return chartData;
  }
}
</script>
