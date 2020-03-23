<template>
  <div id="app">
    <cdg-header />
    <main>
      <cdg-stage />
      <cdg-charts />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CdgHeader from '@/components/CdgHeader.vue';
import CdgStage from '@/components/CdgStage.vue';
import CdgCharts from '@/components/CdgCharts.vue';

@Component({
  components: {
    CdgHeader,
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
