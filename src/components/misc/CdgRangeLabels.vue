<template>
  <div class="label-wrapper">
    <span class="label" v-for="label in labels" :key="label">
      {{ label }}
    </span>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class CdgRangeLabels extends Vue {
  @Prop({ type: Array, required: true })
  private readonly labels!: string[];
}
</script>

<style lang="scss" scoped>
.label-wrapper {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  span {
    margin: 0;
  }
}
</style>
