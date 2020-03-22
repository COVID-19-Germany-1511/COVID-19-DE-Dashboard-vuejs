<template>
  <button :class="className" v-on="$listeners">
    <div class="cdg-big-number-inner">
      <svg-sprite class="icon" :name="data.type" />
      <span class="count">{{ data.count }}</span>
      <span class="type" v-t="`type.${data.type}`"></span>
      <span class="sub-type" v-t="`subType.${data.subType}`"></span>
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
    return `cdg-big-number ${this.data.type}`;
  }
}
</script>

<style lang="scss" scoped>
.cdg-big-number-inner {
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
  margin: 0.5rem 0;
}

.type {
  @extend %subline;
}

.sub-type {
  @extend %font-small-1;
}
</style>
