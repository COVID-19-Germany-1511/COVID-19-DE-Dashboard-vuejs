<template>
  <div class="map">
    <l-map
      :center="[51.9, 10.26]"
      :zoom="6"
      :maxBounds="maxBounds"
      :options="mapOptions"
    >
      <l-choropleth-layer
        :data="data"
        titleKey="name"
        idKey="id"
        :value="value"
        :extraValues="extraValues"
        geojsonIdKey="ID_1"
        :geojson="map"
        :colorScale="colorScale"
        strokeColor="000"
        :min="min"
        :max="max"
        v-if="redrawHack"
      >
      </l-choropleth-layer>
    </l-map>
    {{ showField }}
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { LMap } from 'vue2-leaflet';
import { InfoControl, ReferenceChart, ChoroplethLayer } from 'vue-choropleth';
import 'leaflet/dist/leaflet.css';

import map from '@/data/germany_states_low.geojson';

import { MOCK_DATA, illnessState } from '@/data/mock';

import { COLORS } from '@/constants';

const metrics: {
  key: illnessState;
  metric: string;
}[] = [
  { key: 'confirmed', metric: 'infiziert' },
  { key: 'dead', metric: 'gestorben' },
  { key: 'recovered', metric: 'erholt' },
];

@Component({
  components: {
    LMap,
    'l-info-control': InfoControl,
    'l-reference-chart': ReferenceChart,
    'l-choropleth-layer': ChoroplethLayer,
  },
})
export default class CdgMap extends Vue {
  @Prop({ type: String, default: 'confirmed' })
  private readonly showField!: illnessState;

  map = map;
  data = MOCK_DATA;
  redrawHack = true;

  mapOptions = {
    attributionControl: false,
  };

  @Watch('showField')
  test() {
    this.redrawHack = false;
    this.$nextTick(() => {
      this.redrawHack = true;
    });
  }

  get colorScale() {
    return ['eee', COLORS[this.showField]];
  }

  get maxBounds() {
    // TODO:
    return [];
  }

  get value() {
    return metrics.find(({ key }) => key === this.showField);
  }

  get extraValues() {
    const index = metrics.indexOf(this.value as typeof metrics[0]);
    return metrics.slice(index, 1);
  }

  get values() {
    const { showField } = this;
    return MOCK_DATA.map(entry => entry[showField]);
  }

  get min() {
    return Math.min(...this.values);
  }

  get max() {
    return Math.max(...this.values);
  }
}
</script>

<style scoped lang="scss">
.map {
  width: 100%;
  height: 100%;
}

/deep/ path {
  stroke-dasharray: none !important;
}
</style>
