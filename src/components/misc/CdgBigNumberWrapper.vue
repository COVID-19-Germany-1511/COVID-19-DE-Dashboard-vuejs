<template>
  <div class="count-wrapper">
    <cdg-big-number
      v-for="entry in entries"
      :key="entry.type"
      :data="entry"
      @click="selectType(entry.type)"
      @mouseover="selectType(entry.type)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import StateMixin from '@/components/stateMixin';
import CdgBigNumber from '@/components/misc/CdgBigNumber.vue';
import { StatType } from '@/store/RootState';

@Component({
  components: {
    CdgBigNumber,
  },
})
export default class CdgBigNumberWrapper extends Mixins(StateMixin) {
  get entries() {
    const { dataOfDayAndStates } = this.rootModule.getters;
    return Object.entries(dataOfDayAndStates).map(([key, value]) => {
      return { type: key, count: value };
    });
  }

  selectType(type: StatType) {
    this.rootModule.actions.selectType(type);
  }
}
</script>

<style lang="scss" scoped>
.cdg-big-button {
  @include ratio(0.67);
  margin: 10px;
  background: $color-bg-lighter;
}

.cdg-big-button-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 1em;
}

.icon {
  width: 2 * map-get($font-size-h1, base);
  height: 2 * map-get($font-size-h1, base);
}

.count {
  @extend %cdg-h1;
  margin: 0;
}
</style>
