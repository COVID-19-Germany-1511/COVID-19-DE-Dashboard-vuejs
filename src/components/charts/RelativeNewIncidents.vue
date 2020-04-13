<template>
  <ChartCard
    :chart-id="`newRelative.${type}`"
    :title-i18n-key="`titles.newRelative.${this.type}`"
    :averaged="averaged"
  >
    <template v-slot:chart>
      <PercentageLinear :chart-data="chartData" />
    </template>
  </ChartCard>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import PercentageLinear from '@/components/charts/PercentageLinear';
import {
  averageRecords,
  calculateRelativeNewIncidentsRecords,
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
  components: { ChartCard, PercentageLinear },
})
export default class RelativeNewIncidents extends mixins(StateMixin) {
  @Prop({ required: true })
  public type!: StatType;

  @Prop({ required: false, default: false })
  public averaged!: boolean;

  public get chartId(): string {
    return `newRelative.${this.type}`;
  }

  public get chartData(): ChartData {
    const caseRecordsByState = this.rootModule.getters.selectedDataForType(
      this.type,
    );
    const newIncidentsRecords = transformCaseRecordsToNewIncidentsRecords(
      caseRecordsByState,
    );

    const relativeNewIncidentsRecords = calculateRelativeNewIncidentsRecords(
      newIncidentsRecords,
      caseRecordsByState,
    );

    const chartData = transformCaseRecordsToChartData(
      this.averaged
        ? averageRecords(relativeNewIncidentsRecords, 7, 'percentage')
        : relativeNewIncidentsRecords,
    );

    chartData.datasets = hydrateDatasetsWithColor(
      chartData.datasets,
      this.type,
    );
    return chartData;
  }
}
</script>
