<template>
  <div id="app">
    <cdg-stage />
    <cdg-charts />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CdgStage from '@/components/CdgStage.vue';
import CdgCharts from '@/components/CdgCharts.vue';

@Component({
  components: {
    CdgStage,
    CdgCharts,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss" scoped>
#app {
}
</style>
