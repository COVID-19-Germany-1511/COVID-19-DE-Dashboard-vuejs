<template>
  <div class="gradient">
    <div class="color" :style="gradientStyle"></div>
    <cdg-range-labels :labels="labels" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

import CdgRangeLabels from '@/components/misc/CdgRangeLabels.vue';

@Component({
  components: {
    CdgRangeLabels,
  },
})
export default class CdgMapGradient extends Vue {
  @Prop({ type: Object, required: true })
  private readonly data!: any;

  get labels() {
    const { min, max } = this.data;
    return [min, Math.round((min + max) / 2), max];
  }

  get gradientStyle() {
    const { startColor, endColor } = this.data;
    return {
      background: `linear-gradient(to right, ${startColor}, ${endColor}`,
    };
  }
}
</script>

<style scoped lang="scss">
.gradient {
  display: flex;
  flex-direction: column;
  height: 50px;
}

.color {
  flex: 1 0 auto;
}

.label-wrapper {
  padding: 0.25em 1rem;
}
</style>
