<template>
  <div class="input-field type-select">
    <label :for="name">
      <slot></slot>
    </label>

    <select
      :id="name"
      :name="name"
      :readonly="isReadonly"
      v-model="innerModel"
      v-on="inputListeners"
    >
      <option v-if="defaultItem" value="null" disabled>
        {{ defaultItem }}
      </option>
      <option
        v-for="item in items"
        :key="item[itemValue]"
        :value="item[itemValue]"
      >
        {{ item[itemText] }}
      </option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Mixins } from 'vue-property-decorator';

import InputMixin from './inputMixin';

@Component
export default class CdgSelect extends Mixins(InputMixin) {
  @Prop({ type: String, default: null })
  private readonly defaultItem!: string;

  @Prop({ type: Array, required: true })
  private readonly items!: object[];

  @Prop({ type: String, required: true })
  private readonly itemText!: string;

  @Prop({ type: String, required: true })
  private readonly itemValue!: string;

  get innerModel() {
    return this.value ? this.value[this.itemValue] : null;
  }

  set innerModel(value) {
    // this.value = value
  }

  sendInput(event: any) {
    const value = event.target.value;
    const key = this.itemValue;
    const selectedItem = this.items.find((item: any) => item[key] === value);

    this.$emit('change', selectedItem);
    this.$emit('input', selectedItem);
  }
}
</script>

<style lang="scss" scoped>
// as presented here: https://www.filamentgroup.com/lab/select-css.html
select {
  display: block;
  width: 100%;
  max-width: 100%;
  height: $select-height;
  margin: 0;
  padding: 0 44px 0 16px;
  color: $color-input-text;
  background-color: $color-input-bg;
  background-image: url('../../assets/img/select-arrow.svg');
  background-repeat: no-repeat;
  background-position: right 16px top 50%;
  background-size: auto 9px;
  border: 0;
  border-radius: 0;
  //avoid iOS Zoom
  font-size: 16px;
  line-height: $select-height;
  appearance: none;

  &::-ms-expand {
    display: none;
  }

  option {
    color: $black;
    background: $white;
  }
}
</style>
