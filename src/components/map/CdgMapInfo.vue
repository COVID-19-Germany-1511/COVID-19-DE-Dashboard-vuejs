<template>
  <div class="map-info">
    <div>
      <span class="type" v-t="`type.${selection.caseState}`" />
      <span class="sub-type">
        (<span v-t="`subType.${selection.subType}`" />)
      </span>
    </div>
    <span
      class="date"
      v-t="{ path: 'general.date', args: { date: $d(selection.day) } }"
    ></span>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import StateMixin from '@/components/stateMixin';

@Component
export default class CdgMapInfo extends Mixins(StateMixin) {
  get selection() {
    return this.rootModule.state.selection;
  }
}
</script>

<style lang="scss" scoped>
.map-info {
  @extend %body-font;
  padding: 0.5rem;
  background: rgba($color-bg, 0.6);
}

.sub-type {
  @extend %font-small-2;
}
</style>
