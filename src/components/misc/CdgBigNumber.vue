<template>
  <button :class="className" v-on="$listeners">
    <div class="cdg-big-button-inner">
      <svg-sprite class="icon" :name="data.type" />
      <span class="count">{{ data.count }}</span>
      <span class="title">{{ title }}</span>
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

  get title() {
    switch (this.data.type) {
      case 'confirmed':
        return 'Infiziert';
      case 'deaths':
        return 'Gestorben';
    }
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
