<template>
  <ChartCard
    :chart-id="`new.${type}`"
    :title-i18n-key="`titles.new.${type}`"
    :logarithmic="logarithmic"
    :averaged="averaged"
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
import {
  averageRecords,
  transformCaseRecordsToChartData,
  transformCaseRecordsToNewIncidentsRecords,
} from '@/lib/transformations/transformToDatasets';
import { hydrateDatasetsWithColor } from '@/lib/colors';
import { mixins } from 'vue-class-component';
import StateMixin from '@/components/stateMixin';
import { ChartData } from 'chart.js';
import { StatType } from '@/store/RootState';
import ChartCard from '@/components/charts/ChartCard.vue';

@Component({
  components: { ChartCard, CasesLinear, CasesLog },
})
export default class NewIncidents extends mixins(StateMixin) {
  @Prop({ required: false, default: false })
  public logarithmic!: boolean;

  @Prop({ required: true })
  public type!: StatType;

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
