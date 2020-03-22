<template>
  <div class="charts">
    <ConfirmedCases class="chart" />
    <Deaths class="chart" />
    <ConfirmedCases class="chart" :logarithmic="true" />
    <Deaths class="chart" :logarithmic="true" />
    <Mortality class="chart" />
    <NewIncidents class="chart" type="confirmed" />
    <NewIncidents class="chart" type="deaths" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ConfirmedCases from '@/components/charts/ConfirmedCases.vue';
import StateMixin from '@/components/stateMixin';
import Deaths from '@/components/charts/Deaths.vue';
import Mortality from '@/components/charts/Mortality.vue';
import NewIncidents from '@/components/charts/NewIncidents.vue';

@Component({
  components: {
    NewIncidents,
    Mortality,
    ConfirmedCases,
    Deaths,
  },
})
export default class CdgCharts extends Mixins(StateMixin) {}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.charts {
  display: flex;
  flex-flow: row wrap;
  margin: 0 -1rem;
}

.chart {
  width: calc(100% - 4rem);
  margin: 2rem;
}

@include breakpoint-up(lg) {
  .chart {
    width: calc(50% - 4rem);
  }
}
</style>
