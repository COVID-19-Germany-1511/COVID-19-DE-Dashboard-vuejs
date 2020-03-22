<template>
  <div>
    <h2 v-t="`incidentsHeadline.${this.type}`" />
    <p><span v-if="this.logarithmic" v-t="'logScale'" /></p>
    <CasesLog v-if="this.logarithmic" :chart-data="this.chartData" />
    <CasesLinear v-else :chart-data="this.chartData" />
  </div>
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

@Component({
  components: { CasesLinear, CasesLog },
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
