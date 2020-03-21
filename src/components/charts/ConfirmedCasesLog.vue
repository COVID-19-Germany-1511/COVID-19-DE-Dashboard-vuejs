<template>
  <div>
    <h2>Confirmed Cases</h2>
    <CasesLog :dates="this.dates" :data-sets="this.dataSets" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';
import CasesLog from '@/components/charts/CasesLog';
import { CaseRecordsByState } from '@/store/RootState';
import { Dataset } from '@/lib/transformations/Dataset';
import { transformCaseRecordsToDataset } from '@/lib/transformations/transformToDatasets';

@Component({
  components: { CasesLog },
})
export default class ConfirmedCasesLog extends Vue {
  @Prop({ required: true })
  public confrimedData!: CaseRecordsByState;

  public get dates(): string[] {
    return Object.keys(Object.values(this.confrimedData)[0]);
  }

  public get dataSets(): Dataset[] {
    return transformCaseRecordsToDataset(this.confrimedData);
  }
}
</script>
