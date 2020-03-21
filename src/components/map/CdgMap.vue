<template>
  <div class="wrapper">
    <l-map
      class="map"
      :bounds="bounds"
      :maxBounds="bounds"
      :options="mapOptions"
      ref="map"
    >
      <l-geo-json
        v-if="redrawHack"
        :geojson="map"
        :options="geojsonOptions"
        ref="geolayer"
      />
    </l-map>
    <div class="legend">
      <cdg-map-gradient :data="gradientData" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator';
import { Browser } from 'leaflet';
import { LMap, LGeoJson } from 'vue2-leaflet';
import { extent } from 'geojson-bounds';
import chroma from 'chroma-js';
import 'leaflet/dist/leaflet.css';

import map from '@/data/germany_states_low.geojson';

import CdgMapGradient from './CdgMapGradient.vue';

import { MOCK_DATA, illnessState } from '@/data/mock';

import { COLORS } from '@/constants';

@Component({
  components: {
    LMap,
    LGeoJson,
    CdgMapGradient,
  },
})
export default class CdgMap extends Vue {
  @Prop({ type: String, default: 'confirmed' })
  private readonly showField!: illnessState;

  map = map;
  data = MOCK_DATA;
  redrawHack = true;
  currentState: number | null = null;

  mapOptions = {
    attributionControl: false,
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    touchZoom: false,
    keyboard: false,
  };

  geojsonOptions = {
    style: (feature: GeoJSON.Feature) => {
      const geoJsonId = feature.properties?.ID_1;
      const dataItem = MOCK_DATA.find(({ id }) => id === geoJsonId);
      return {
        fillColor: this.getColor(dataItem[this.showField]),
      };
    },
    onEachFeature: (feature: any, layer: L.Layer) => {
      layer.on({
        mouseover: this.onMouseOver.bind(this),
        mouseout: this.onMouseOut.bind(this),
      });
    },
  };

  get bounds() {
    const bounds = extent(map);
    return [
      [bounds[1], bounds[0]],
      [bounds[3], bounds[2]],
    ];
  }

  get colorScale() {
    return chroma.scale(['eee', COLORS[this.showField]]);
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

  get gradientData() {
    const { min, max } = this;
    return {
      min,
      max,
      startColor: this.getColor(min),
      endColor: this.getColor(max),
    };
  }

  getColor(value: number): string {
    return this.colorScale
      .mode('lch')(value / this.max)
      .hex();
  }

  onMouseOver({ target }: L.LeafletMouseEvent) {
    if (!Browser.ie && !Browser.opera) {
      target.bringToFront();
    }
    const geoJsonId = target.feature.properties?.ID_1;
    this.currentState = MOCK_DATA.find(({ id }) => id === geoJsonId);
  }

  onMouseOut() {
    this.currentState = null;
  }

  @Watch('showField')
  triggerRedraw() {
    this.redrawHack = false;
    this.$nextTick(() => {
      this.redrawHack = true;
    });
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

/deep/ path {
  fill-opacity: 1 !important;
  stroke: $color-bg;
  stroke-width: 2px;
  stroke-dasharray: none !important;
}
/deep/ path:hover {
  stroke: $color-text;
  stroke-width: 4px;
}
</style>
