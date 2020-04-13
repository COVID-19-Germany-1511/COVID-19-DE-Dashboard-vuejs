<template>
  <ChartCard
    :chart-id="`incidents.${this.type}`"
    :title-i18n-key="`titles.history.${this.type}`"
    :logarithmic="this.logarithmic"
  >
    <template v-slot:chart>
      <CasesLog v-if="logarithmic" :chart-data="chartData" />
      <CasesLinear v-else :chart-data="chartData" />
    </template>
  </ChartCard>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import CasesLinear from '@/components/charts/CasesLinear';
import CasesLog from '@/components/charts/CasesLog';
import { transformCaseRecordsToChartData } from '@/lib/transformations/transformToDatasets';
import { hydrateDatasetsWithColor } from '@/lib/colors';
import { mixins } from 'vue-class-component';
import StateMixin from '@/components/stateMixin';
import { ChartData } from 'chart.js';
import { StatType } from '@/store/RootState';
import ChartCard from '@/components/charts/ChartCard.vue';

@Component({
  components: { ChartCard, CasesLinear, CasesLog },
})
export default class Incidents extends mixins(StateMixin) {
  @Prop({ required: false, default: false })
  public logarithmic!: boolean;

  @Prop({ required: true })
  public type!: StatType;

  public get chartData(): ChartData {
    const chartData = transformCaseRecordsToChartData(
      this.rootModule.getters.selectedDataForType(this.type),
    );

    chartData.datasets = hydrateDatasetsWithColor(
      chartData.datasets,
      this.type,
    );
    return chartData;
  }
}
</script>
