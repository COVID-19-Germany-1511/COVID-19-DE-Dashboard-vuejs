<template>
  <div class="charts">
    <ConfirmedCases class="chart" />
    <Deaths class="chart" />
    <ConfirmedCases class="chart" :logarithmic="true" />
    <Deaths class="chart" :logarithmic="true" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import ConfirmedCases from '@/components/charts/ConfirmedCases.vue';
import StateMixin from '@/components/stateMixin';
import Deaths from '@/components/charts/Deaths.vue';

@Component({
  components: {
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
