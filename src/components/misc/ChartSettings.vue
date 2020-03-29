<template>
  <div class="chartSettings">
    <span>
      <button
        v-if="rootModule.state.selection.yAxisScaling === 'linear'"
        @click="rootModule.actions.selectYAxisScaling('logarithmic')"
        v-t="'buttonLabel.logarithmic'"
      />
      <button
        v-else
        @click="rootModule.actions.selectYAxisScaling('linear')"
        v-t="'buttonLabel.linear'"
      />
    </span>
    <span>
      <button
        v-if="rootModule.state.selection.averaged"
        @click="rootModule.actions.setChartAveraging(false)"
        v-t="'buttonLabel.daily'"
      />
      <button
        v-else
        @click="rootModule.actions.setChartAveraging(true)"
        v-t="'buttonLabel.averaged'"
      />
    </span>
  </div>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import { Mixins } from 'vue-property-decorator';
import StateMixin from '@/components/stateMixin';

@Component
export default class ChartSettings extends Mixins(StateMixin) {}
</script>

<style lang="scss" scoped>
.chartSettings {
  display: flex;

  & span {
    display: inline-flex;
    justify-content: space-around;
    width: 50%;
  }
}

button {
  padding: 8px;
  border: 2px solid darken($color-input-bg, 20);
  color: $color-input-text;
  background-color: $color-input-bg;

  &:hover,
  &:focus {
    background-color: darken($color-input-bg, 10);
  }
}
</style>
