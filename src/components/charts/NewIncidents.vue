<template>
  <div>
    <h2 v-t="`newIncidentsHeadline.${this.type}`" />
    <p v-if="this.averaged" v-t="'averagedOver7DaysDesc'"></p>
    <CasesLog v-if="this.logarithmic" :chart-data="this.chartData" />
    <CasesLinear v-else :chart-data="this.chartData" />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import CasesLinear from '@/components/charts/CasesLinear';
import CasesLog from '@/components/charts/CasesLog';
import {
  averageRecords,
  transformCaseRecordsToChartData,
  transformCaseRecordsToNewIncidentsRecords,
} from '@/lib/transformations/transformToDatasets';
import { hydrateDatasetsWithColor } from '@/lib/colors';
import { mixins } from 'vue-class-component';
import StateMixin from '@/components/stateMixin';
import { ChartData } from 'chart.js';

@Component({
  components: { CasesLinear, CasesLog },
})
export default class NewIncidents extends mixins(StateMixin) {
  @Prop({ required: false, default: false })
  public logarithmic!: boolean;

  @Prop({ required: true })
  public type!: 'confirmed' | 'deaths';

  @Prop({ required: false, default: false })
  public averaged!: boolean;

  public get chartData(): ChartData {
    const newIncidentsRecords = transformCaseRecordsToNewIncidentsRecords(
      this.rootModule.getters.selectedDataForType(this.type),
    );

    const chartData = transformCaseRecordsToChartData(
      this.averaged
        ? averageRecords(newIncidentsRecords, 7, 'additive')
        : newIncidentsRecords,
    );

    chartData.datasets = hydrateDatasetsWithColor(
      chartData.datasets,
      this.type,
    );
    return chartData;
  }
}
</script>
