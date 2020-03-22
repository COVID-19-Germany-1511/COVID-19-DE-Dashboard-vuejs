<template>
  <div>
    <h2 v-t="`newIncidentsHeadline.${this.type}`" />
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
import CasesLog from '@/components/charts/CasesLog';
import { Dataset } from '@/lib/transformations/Dataset';
import { transformCaseRecordsToNewIncidentsDataset } from '@/lib/transformations/transformToDatasets';
import { hydrateDatasetsWithColor } from '@/lib/colors';
import { mixins } from 'vue-class-component';
import StateMixin from '@/components/stateMixin';

@Component({
  components: { CasesLinear, CasesLog },
})
export default class NewIncidents extends mixins(StateMixin) {
  @Prop({ required: false, default: false })
  public logarithmic!: boolean;

  @Prop({ required: true })
  public type!: 'confirmed' | 'deaths';

  public get dates(): string[] {
    return Object.keys(Object.values(this.rootModule.getters[this.type])[0]);
  }

  public get dataSets(): Dataset[] {
    const dataSets = transformCaseRecordsToNewIncidentsDataset(
      this.rootModule.getters[this.type],
    );
    return hydrateDatasetsWithColor(dataSets, this.type);
  }
}
</script>
