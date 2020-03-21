<template>
  <svg :class="className" xmlns="http://www.w3.org/2000/svg">
    <title v-if="title">{{ title }}</title>
    <use :xlink:href="iconPath" xmlns:xlink="http://www.w3.org/1999/xlink" />
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class SvgSprite extends Vue {
  @Prop({ type: String, required: true }) private readonly name!: string;
  @Prop({ type: String, default: null }) private readonly title!: string;

  get iconPath() {
    return require(`@/assets/img/svg-sprite/${this.name}.svg`).default.url;
  }

  get className() {
    return `svg-icon svg-icon--${this.name}`;
  }
}
</script>
