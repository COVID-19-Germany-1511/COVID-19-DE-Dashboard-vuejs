<template>
  <div>
    <h2>Mortalität (CFR)</h2>
    <PercentageLinear :dates="this.dates" :data-sets="this.dataSets" />
  </div>
</template>

<script lang="ts">
import Component, { mixins } from 'vue-class-component';
import { Dataset } from '@/lib/transformations/Dataset';
import { transformCaseRecordsToMortailityDataset } from '@/lib/transformations/transformToDatasets';
import StateMixin from '@/components/stateMixin';
import PercentageLinear from '@/components/charts/PercentageLinear';
import { COLORS } from '@/constants';
import { getDatasetColorPalette } from '@/lib/colors';

@Component({
  components: { PercentageLinear },
})
export default class Mortality extends mixins(StateMixin) {
  public get dates(): string[] {
    return Object.keys(Object.values(this.rootModule.getters.confirmed)[0]);
  }

  public get dataSets(): Dataset[] {
    const dataSets = transformCaseRecordsToMortailityDataset(
      this.rootModule.getters.confirmed,
      this.rootModule.getters.deaths,
    );

    let colors: string[];
    if (dataSets.length === 1) {
      colors = [COLORS.deaths];
    } else {
      colors = getDatasetColorPalette(dataSets.length);
    }

    return dataSets.map(dataSet => {
      const datasetColor = colors.pop();
      return {
        ...dataSet,
        borderColor: datasetColor,
        backgroundColor: datasetColor,
      };
    });
  }
}
</script>

<style lang="scss"></style>
