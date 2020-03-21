<template>
  <div class="stage">
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
import CdgMap from '@/components/map/CdgMap.vue';
import CdgBigNumber from '@/components/misc/CdgBigNumber.vue';

@Component({
  components: {
    CdgMap,
    CdgBigNumber,
  },
})
export default class CdgStage extends Vue {
  data = [
    { type: 'confirmed', count: 123, title: 'Infiziert' },
    { type: 'dead', count: 12, title: 'Gestorben' },
  ];

  type = 'confirmed';

  selectType(type: any) {
    this.type = type;
  }
}
</script>

<style lang="scss" scoped>
.stage {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.map-wrapper {
  height: 136.875vw;
  max-height: 67%;
}

.content {
  padding: 1rem;
}

.count-wrapper {
  display: flex;
  flex-flow: row wrap;
  margin: -10px;
}

.cdg-big-button {
  min-width: 200px;
  max-width: 300px;
  width: calc(50% - 20px);
}

@include breakpoint-up(lg) {
  .stage {
    flex-direction: row;
  }

  .map-wrapper,
  .content {
    width: 50vw;
  }

  .content {
    padding: 1rem calc(1rem + 10px);
  }
}
</style>
