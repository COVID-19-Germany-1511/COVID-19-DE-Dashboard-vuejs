<template>
  <ChartCard
    :chart-id="`growthFactor.${this.type}`"
    :title-i18n-key="`titles.growthFactor.${this.type}`"
  >
    <template v-slot:chart>
      <CasesLinear :chart-data="chartData" />
    </template>
  </ChartCard>
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
import { CaseStateName } from '@/store/RootState';
import ChartCard from '@/components/charts/ChartCard.vue';

@Component({
  components: { ChartCard, CasesLinear },
})
export default class GrowthFactor extends mixins(StateMixin) {
  @Prop({ required: true })
  public type!: CaseStateName;

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
