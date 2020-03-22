<template>
  <div class="gradient">
    <div class="color" :style="gradientStyle"></div>
    <div class="label-wrapper">
      <span class="label label-0">{{ data.min }}</span>
      <span class="label label-1">{{ mean }}</span>
      <span class="label label-2">{{ data.max }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CdgMapGradient extends Vue {
  @Prop({ type: Object, required: true })
  private readonly data!: any;

  get mean() {
    const { min, max } = this.data;
    return Math.round((min + max) / 2);
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
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0.25em 1rem;

  span {
    margin: 0;
  }
}
</style>
