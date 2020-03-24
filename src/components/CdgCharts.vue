<template>
  <div class="charts">
    <Incidents class="chart" type="confirmed" />
    <Incidents class="chart" type="deaths" />
    <Incidents class="chart" type="confirmed" :logarithmic="true" />
    <Incidents class="chart" type="deaths" :logarithmic="true" />
    <NewIncidents class="chart" type="confirmed" />
    <RelativeNewIncidents class="chart" type="confirmed" />
    <NewIncidents class="chart" type="deaths" />
    <RelativeNewIncidents class="chart" type="deaths" />
    <NewIncidents class="chart" type="confirmed" :averaged="true" />
    <Mortality class="chart" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import StateMixin from '@/components/stateMixin';
import Mortality from '@/components/charts/Mortality.vue';
import NewIncidents from '@/components/charts/NewIncidents.vue';
import Incidents from '@/components/charts/Incidents.vue';
import RelativeNewIncidents from '@/components/charts/RelativeNewIncidents.vue';

@Component({
  components: {
    RelativeNewIncidents,
    Incidents,
    NewIncidents,
    Mortality,
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
