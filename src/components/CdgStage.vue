<template>
  <div class="stage">
    <div class="map-wrapper">
      <cdg-map class="map" />
      <cdg-day-select />
    </div>
    <div class="content">
      <h2
        v-t="{ path: 'titles.table', args: { selection: selectedStates } }"
      ></h2>
      <span
        class="day"
        v-t="{ path: 'general.date', args: { date: selectedDay } }"
      ></span>
      <cdg-table />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import CdgMap from '@/components/map/CdgMap.vue';
import CdgDaySelect from '@/components/misc/CdgDaySelect.vue';
import CdgTable from '@/components/misc/CdgTable.vue';
import StateMixin from '@/components/stateMixin';

@Component({
  components: {
    CdgMap,
    CdgDaySelect,
    CdgTable,
  },
})
export default class CdgStage extends Mixins(StateMixin) {
  get selectedStates() {
    const { states } = this.rootModule.state.selection;
    return states.length ? states.join(', ') : 'Deutschland';
  }

  get selectedDay() {
    return this.rootModule.state.selection.day;
  }
}
</script>

<style lang="scss" scoped>
.stage {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  background: darken($color-bg, 2%);
  border-bottom: 1px solid darken($color-bg, 5%);
}

.map {
  height: 136.875vw;
  max-height: 67vh;
}

.day-select {
  margin-top: 1rem;
}

.content {
  padding: 1rem;
}

.day {
  display: block;
  margin-bottom: 1rem;
}

@include breakpoint-up(lg) {
  .stage {
    flex-direction: row;
  }

  .map-wrapper,
  .content {
    width: 50vw;
  }

  .content {
    padding: 1rem calc(1rem + 10px);
  }
}
</style>
