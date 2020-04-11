<template>
  <a :href="`#${id}`">
    <h2 v-t="{ path: i18nKey }" />
  </a>
</template>

<script lang="ts">
import Component from 'vue-class-component';
import Vue from 'vue';
import { Prop } from 'vue-property-decorator';

@Component
export default class ChartHeading extends Vue {
  @Prop({ required: true })
  public i18nKey!: string;

  @Prop({ required: true })
  public id!: string;
}
</script>

<style lang="scss"></style>
