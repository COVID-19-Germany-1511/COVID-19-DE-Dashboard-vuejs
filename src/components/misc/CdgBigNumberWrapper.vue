<template>
  <div>
    <div class="count-wrapper">
      <cdg-big-number
        v-for="entry in total"
        :key="entry.type"
        :data="entry"
        @click="selectType(entry.type)"
        @mouseover="selectType(entry.type)"
      />
    </div>
    <div class="count-wrapper">
      <cdg-big-number
        v-for="entry in perPop"
        :key="entry.type"
        :data="entry"
        @click="selectType(entry.type)"
        @mouseover="selectType(entry.type)"
      />
    </div>
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
    return Object.entries(dataOfDayAndStates);
  }

  get total() {
    return this.entries.map(([key, value]) => {
      return { type: key, subType: 'total', count: value };
    });
  }

  get perPop() {
    const { population } = this.rootModule.getters.selectedStatesMeta;
    return this.entries.map(([key, value]) => {
      let count: number | string = (value / population) * 100000;
      count = count.toLocaleString(undefined, { maximumFractionDigits: 2 });
      return { type: key, subType: 'perPop', count };
    });
  }

  selectType(type: StatType) {
    this.rootModule.actions.selectType(type);
  }
}
</script>

<style lang="scss" scoped>
.count-wrapper {
  display: flex;
  flex-flow: row wrap;
  margin: -10px;
}

.cdg-big-number {
  // @include ratio(0.67);
  min-width: 200px;
  max-width: 300px;
  width: calc(50% - 20px);
  margin: 15px 10px;
  background: $color-bg-lighter;
}
</style>
