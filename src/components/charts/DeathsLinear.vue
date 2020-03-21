<template>
  <div>
    <h2>Verlauf der Totesfälle</h2>
    <CasesLinear :dates="this.dates" :data-sets="this.dataSets" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import CasesLinear from '@/components/charts/CasesLinear';
import { CaseRecordsByState } from '@/store/RootState';
import { Dataset } from '@/lib/transformations/Dataset';
import { transformCaseRecordsToDataset } from '@/lib/transformations/transformToDatasets';
import { COLORS } from '@/constants';
import { getDatasetColorPalette } from '@/lib/colors';

@Component({
  components: { CasesLinear },
})
export default class DeathsLinear extends Vue {
  @Prop({ required: true })
  public deaths!: CaseRecordsByState;

  public get dates(): string[] {
    return Object.keys(Object.values(this.deaths)[0]);
  }

  public get dataSets(): Dataset[] {
    const dataSets = transformCaseRecordsToDataset(this.deaths);
    let colors: string[];
    if (dataSets.length === 1) {
      colors = [COLORS.dead];
    } else {
      colors = getDatasetColorPalette(dataSets.length);
    }

    return dataSets.map(dataSet => ({
      ...dataSet,
      borderColor: colors.pop(),
    }));
  }
}
</script>
