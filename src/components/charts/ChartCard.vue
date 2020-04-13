<template>
  <div :id="chartId" class="chartCard">
    <a :href="`#${chartId}`">
      <h2 v-t="{ path: titleI18nKey }" />
    </a>
    <p><span v-if="logarithmic" v-t="'logScale'" /></p>
    <p>
      <span v-if="averaged" v-t="'averagedOver7DaysDesc'" />
    </p>
    <slot name="chart" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class ChartCard extends Vue {
  @Prop({ required: true })
  public chartId!: string;

  @Prop({ required: true })
  public titleI18nKey!: string;

  @Prop({ required: false, default: false })
  public logarithmic!: boolean;

  @Prop({ required: false, default: false })
  public averaged!: boolean;
}
</script>

<style lang="scss">
.chartCard {
  padding: 0 4px;

  &:target {
    box-shadow: 0 0 5px $color-inverted-bg;
  }
}
</style>
