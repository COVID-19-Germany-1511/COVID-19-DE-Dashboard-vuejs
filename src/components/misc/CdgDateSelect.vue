<template>
  <div class="date-select">
    <label>
      <span class="sr-only">Tag</span>
      <input
        type="range"
        min="0"
        :max="availableDates.length - 1"
        step="1"
        v-model="selectedDateIndex"
      />
    </label>
    <cdg-range-labels :labels="labels" />
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';

import CdgRangeLabels from '@/components/misc/CdgRangeLabels.vue';
import StateMixin from '@/components/stateMixin';

@Component({
  components: {
    CdgRangeLabels,
  },
})
export default class CdgDateSelect extends Mixins(StateMixin) {
  get availableDates() {
    return this.rootModule.state.availableDates;
  }

  get selectedDate() {
    return this.rootModule.state.selection.date;
  }

  get selectedDateIndex() {
    const { availableDates } = this;
    return availableDates.indexOf(this.selectedDate);
  }

  set selectedDateIndex(index: number) {
    const date = this.availableDates[index];
    this.rootModule.actions.selectDate(date);
  }

  get labels() {
    const { availableDates } = this;
    const middle = Math.floor(availableDates.length / 2);
    return [
      availableDates[0],
      availableDates[middle],
      availableDates[availableDates.length - 1],
    ];
  }
}
</script>

<style lang="scss" scoped>
.date-select {
  display: block;
  padding: 0.25em 1rem;
}

@mixin track-common {
  cursor: pointer;
  height: 5px;
  width: 100%;
  background: transparent;
  border: none;
  border-radius: 0;
  box-shadow: none;
}

@mixin thumb-common {
  width: 10px;
  height: 20px;
  background: darken($color-text, 15%);
  cursor: pointer;
  border: 1px solid darken($color-bg, 5%);
  border-radius: 2px;
  color: transparent;
}

input {
  position: relative;
  z-index: 1;
  width: 100%;
  margin: 0;
  padding: 0;
  -webkit-appearance: none;
  background: none;

  &:before {
    position: absolute;
    top: 50%;
    left: 0;
    z-index: -1;
    display: block;
    content: '';
    height: 5px;
    width: calc(100% + 2rem);
    margin: -2.5px -1rem 0;
    background: lighten($color-text, 15%);
  }

  &:focus {
    outline: none;

    &::-ms-fill-lower,
    &::-ms-fill-upper {
      background: lighten($color-text, 15%);
    }
  }

  &::-webkit-slider-runnable-track {
    @include track-common;
  }

  &::-moz-range-track {
    @include track-common;
  }

  &::-ms-track {
    @include track-common;
  }

  &::-ms-fill-lower {
    background: transparent;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }

  &::-ms-fill-upper {
    background: transparent;
    border: none;
    border-radius: 0;
    box-shadow: none;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    @include thumb-common;
    margin-top: -7.5px;
  }

  &::-moz-range-thumb {
    @include thumb-common;
  }

  &::-ms-thumb {
    @include thumb-common;
  }

  &::-ms-tooltip {
    display: none;
  }
}
</style>
