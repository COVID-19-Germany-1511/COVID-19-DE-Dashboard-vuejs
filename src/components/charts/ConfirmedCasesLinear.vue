<template>
  <div>
    <h2>Verlauf der Infektionen</h2>
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
import { getDatasetColorPalette } from '@/lib/colors';
import { COLORS } from '@/constants';

@Component({
  components: { CasesLinear },
})
export default class ConfirmedCasesLinear extends Vue {
  @Prop({ required: true })
  public confrimedData!: CaseRecordsByState;

  public get dates(): string[] {
    return Object.keys(Object.values(this.confrimedData)[0]);
  }

  public get dataSets(): Dataset[] {
    const dataSets = transformCaseRecordsToDataset(this.confrimedData);
    let colors: string[];
    if (dataSets.length === 1) {
      colors = [COLORS.confirmed];
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
