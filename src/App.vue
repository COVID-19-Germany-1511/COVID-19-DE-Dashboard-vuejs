<template>
  <div id="app">
    <div class="map-wrapper">
      <cdg-map :showField="type" />
    </div>
    <div class="content">
      <h1>Corona Dashboard Germany</h1>
      <h2>Stats</h2>
      <div class="count-wrapper">
        <cdg-big-number
          v-for="entry in data"
          :key="entry.type"
          :data="entry"
          @click="selectType(entry.type)"
          @mouseover="selectType(entry.type)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CdgMap from './components/CdgMap.vue';
import CdgBigNumber from './components/misc/CdgBigNumber.vue';

@Component({
  components: {
    CdgMap,
    CdgBigNumber,
  },
})
export default class App extends Vue {
  data = [
    { type: 'confirmed', count: 123, title: 'Infiziert' },
    { type: 'dead', count: 12, title: 'Gestorben' },
    { type: 'recovered', count: 15, title: 'Erholt' },
  ];

  type = 'confirmed';

  selectType(type: any) {
    this.type = type;
  }
}
</script>

<style lang="scss">
#app {
  position: relative;

  .map-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 50vw;
    height: 100vh;
  }

  .content {
    width: 50vw;
    margin-left: 50vw;
    padding: 1vmin calc(1vmin + 10px);
  }
}

.count-wrapper {
  display: flex;
  flex-flow: row wrap;
  margin: -10px;
}
</style>
