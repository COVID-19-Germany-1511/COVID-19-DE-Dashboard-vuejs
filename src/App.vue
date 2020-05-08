<template>
  <div id="app">
    <cdg-header />
    <main v-if="rootModule.state.initialized">
      <cdg-stage />
      <cdg-charts />
    </main>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import StateMixin from '@/components/stateMixin';
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
export default class App extends Mixins(StateMixin) {
  created() {
    this.rootModule.actions.loadData();
  }
}
</script>

<style lang="scss" scoped>
#app {
}
</style>
