<template>
  <div>
    <h2>Verlauf der Totesfälle</h2>
    <CasesLog
      v-if="this.logarithmic"
      :dates="this.dates"
      :data-sets="this.dataSets"
    />
    <CasesLinear v-else :dates="this.dates" :data-sets="this.dataSets" />
  </div>
</template>

<script lang="ts">
import { Component, Prop } from 'vue-property-decorator';
import CasesLinear from '@/components/charts/CasesLinear';
import { Dataset } from '@/lib/transformations/Dataset';
import { transformCaseRecordsToDataset } from '@/lib/transformations/transformToDatasets';
import { COLORS } from '@/constants';
import { getDatasetColorPalette } from '@/lib/colors';
import CasesLog from '@/components/charts/CasesLog';
import { mixins } from 'vue-class-component';
import StateMixin from '@/components/stateMixin';

@Component({
  components: { CasesLog, CasesLinear },
})
export default class Deaths extends mixins(StateMixin) {
  @Prop({ required: false, default: false })
  public logarithmic!: boolean;

  public get dates(): string[] {
    return Object.keys(Object.values(this.rootModule.getters.deaths)[0]);
  }

  public get dataSets(): Dataset[] {
    const dataSets = transformCaseRecordsToDataset(
      this.rootModule.getters.deaths,
    );
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
