<template>
  <button :class="className" v-on="$listeners">
    <div class="cdg-big-button-inner">
      <svg-sprite class="icon" :name="data.type" />
      <span class="count">{{ data.count }}</span>
      <span class="title">{{ data.title }}</span>
    </div>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import SvgSprite from '@/components/misc/SvgSprite.vue';

@Component({
  components: {
    SvgSprite,
  },
})
export default class CdgBigNumber extends Vue {
  @Prop({ type: Object, required: true }) private readonly data!: any;

  get className() {
    return `cdg-big-button ${this.data.type}`;
  }
}
</script>

<style lang="scss" scoped>
.cdg-big-button {
  @include ratio(1);
  min-width: 200px;
  max-width: 300px;
  width: 25%;
  margin: 10px;
  background: $color-bg-lighter;
}

.cdg-big-button-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1em;
}

.icon {
  width: 2.5em;
  height: 2.5em;
}
</style>
