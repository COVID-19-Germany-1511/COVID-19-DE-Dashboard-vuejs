<template>
  <button :class="className" v-on="$listeners">
    <div class="cdg-big-button-inner">
      <svg-sprite class="icon" :name="data.type" />
      <span class="count">{{ count }}</span>
      <span class="title">{{ data.title }}</span>
    </div>
  </button>
</template>

<script lang="ts">
import { Component, Mixins, Prop } from 'vue-property-decorator';

import SvgSprite from '@/components/misc/SvgSprite.vue';
import StateMixin from '@/components/stateMixin';

@Component({
  components: {
    SvgSprite,
  },
})
export default class CdgBigNumber extends Mixins(StateMixin) {
  @Prop({ type: Object, required: true }) private readonly data!: any;

  get className() {
    return `cdg-big-button ${this.data.type}`;
  }

  get count() {
    const data = this.rootModule.getters.selectedDataForType(this.data.type);
    return Object.values(data)
      .map(days => {
        const daysArr = Object.entries(days);
        daysArr.sort((a, b) => (a[0] as any) - (b[0] as any));
        return daysArr[daysArr.length - 1][1];
      })
      .reduce((sum, cur) => sum + cur);
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
