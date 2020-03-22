<template>
  <div class="stage">
    <div class="map-wrapper">
      <cdg-map />
    </div>
    <div class="content">
      <h1>Corona Dashboard Germany</h1>
      <h2>Statistiken für {{ selectedStates }}</h2>
      <cdg-big-number-wrapper />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import CdgMap from '@/components/map/CdgMap.vue';
import CdgBigNumberWrapper from '@/components/misc/CdgBigNumberWrapper.vue';
import StateMixin from '@/components/stateMixin';

@Component({
  components: {
    CdgMap,
    CdgBigNumberWrapper,
  },
})
export default class CdgStage extends Mixins(StateMixin) {
  get selectedStates() {
    const { states } = this.rootModule.state.selection;
    return states.length ? states.join(', ') : 'Deutschland';
  }
}
</script>

<style lang="scss" scoped>
.stage {
  display: flex;
  flex-direction: column;
}

.map-wrapper {
  height: 136.875vw;
  max-height: 67vh;
}

.content {
  padding: 1rem;
}

.count-wrapper {
  display: flex;
  flex-flow: row wrap;
  margin: -10px;
}

.cdg-big-button {
  min-width: 200px;
  max-width: 300px;
  width: calc(50% - 20px);
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
