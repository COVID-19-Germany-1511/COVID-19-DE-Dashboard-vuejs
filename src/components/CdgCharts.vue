<template>
  <div>
    <ChartSettings />
    <div class="charts">
      <Incidents class="chart" type="confirmed" :logarithmic="isLogScale" />
      <Incidents class="chart" type="deaths" :logarithmic="isLogScale" />
      <NewIncidents
        class="chart"
        type="confirmed"
        :logarithmic="isLogScale"
        :averaged="isAveraged"
      />
      <RelativeNewIncidents
        class="chart"
        type="confirmed"
        :averaged="isAveraged"
      />
      <NewIncidents
        class="chart"
        type="deaths"
        :logarithmic="isLogScale"
        :averaged="isAveraged"
      />
      <GrowthFactor class="chart" type="confirmed" />
      <Mortality class="chart" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import StateMixin from '@/components/stateMixin';
import Mortality from '@/components/charts/Mortality.vue';
import NewIncidents from '@/components/charts/NewIncidents.vue';
import Incidents from '@/components/charts/Incidents.vue';
import RelativeNewIncidents from '@/components/charts/RelativeNewIncidents.vue';
import GrowthFactor from '@/components/charts/GrowthFactor.vue';
import ChartSettings from '@/components/misc/ChartSettings.vue';

@Component({
  components: {
    ChartSettings,
    GrowthFactor,
    RelativeNewIncidents,
    Incidents,
    NewIncidents,
    Mortality,
  },
})
export default class CdgCharts extends Mixins(StateMixin) {
  public get isLogScale() {
    return this.rootModule.state.selection.yAxisScaling === 'logarithmic';
  }

  public get isAveraged() {
    return this.rootModule.state.selection.averaged;
  }
}
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

:target {
  box-shadow: 0 0 5px $color-inverted-bg;
}
</style>
