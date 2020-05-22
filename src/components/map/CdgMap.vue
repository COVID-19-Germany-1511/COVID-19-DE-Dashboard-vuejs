<template>
  <div class="wrapper">
    <l-map
      class="map"
      :bounds="bounds"
      :maxBounds="bounds"
      :options="mapOptions"
      ref="map"
      @click="onOutsideClick"
    >
      <l-geo-json
        v-if="redrawHack"
        :geojson="map"
        :options="geojsonOptions"
        ref="geolayer"
      />

      <l-control position="bottomleft">
        <cdg-map-info />
      </l-control>
    </l-map>
    <div class="legend">
      <cdg-map-gradient :data="gradientData" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
import { Browser } from 'leaflet';
import { LMap, LGeoJson, LControl } from 'vue2-leaflet';
import { extent } from 'geojson-bounds';
import chroma from 'chroma-js';
import 'leaflet/dist/leaflet.css';

import map from '@/data/germany_states_low.geojson';

import CdgMapInfo from './CdgMapInfo.vue';
import CdgMapGradient from './CdgMapGradient.vue';
import StateMixin from '@/components/stateMixin';

import { COLORS } from '@/constants';

const STYLE_DEFAULT = {
  fillOpacity: 0.5,
};
const STYLE_NON_SELECTED = {
  fillOpacity: 0.8,
};
const STYLE_SELECTED = {
  fillOpacity: 1,
};

@Component({
  components: {
    LMap,
    LGeoJson,
    LControl,
    CdgMapInfo,
    CdgMapGradient,
  },
})
export default class CdgMap extends Mixins(StateMixin) {
  map = map;
  redrawHack = false;

  mapOptions = {
    attributionControl: false,
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    touchZoom: false,
    keyboard: false,
  };

  get geojsonOptions() {
    return {
      style: (feature: GeoJSON.Feature) => {
        const id = feature.properties?.ID_1 as number;
        const style = this.isAreaSelected(id)
          ? STYLE_SELECTED
          : this.defaultStyle;
        return {
          ...style,
          fillColor: this.getColor(this.values[id]),
        };
      },
      onEachFeature: (feature: any, layer: L.Layer) => {
        layer.on({
          mouseover: this.onMouseOver.bind(this),
          click: this.onClick.bind(this),
        });
      },
    };
  }

  created() {
    this.redrawHack = true;
  }

  get defaultStyle() {
    return this.rootModule.state.selection.states.length
      ? STYLE_DEFAULT
      : STYLE_NON_SELECTED;
  }

  get values(): { [key: number]: number } {
    const result: { [key: number]: number } = {};
    this.rootModule.getters.dataOfDayAndCaseState.forEach((values, state) => {
      result[state.svgId] = values[this.subType];
    });
    return result;
  }

  get caseState() {
    return this.rootModule.state.selection.caseState;
  }

  get subType() {
    return this.rootModule.state.selection.subType;
  }

  get bounds() {
    const bounds = extent(map);
    return [
      [bounds[1], bounds[0]],
      [bounds[3], bounds[2]],
    ];
  }

  get colorScale() {
    return chroma.scale(['fff', COLORS[this.caseState]]);
  }

  get min() {
    return Math.min(...Object.values(this.values));
  }

  get max() {
    return this.rootModule.getters.selectedCaseStateAllTimeMax[this.subType];
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

  isAreaSelected(svgId: number): boolean {
    return this.rootModule.state.selection.states
      .map(({ svgId }) => svgId)
      .includes(svgId);
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
  }

  onClick({ target, originalEvent }: L.LeafletMouseEvent) {
    originalEvent.stopPropagation();
    const svgId = target.feature.properties?.ID_1;
    this.rootModule.actions.toggleStateSelection(svgId);
    if (this.isAreaSelected(svgId)) {
      target.setStyle(STYLE_SELECTED);
    } else {
      target.setStyle(STYLE_DEFAULT);
    }
  }

  onOutsideClick(event: L.LeafletMouseEvent) {
    if (event.originalEvent.target === (this.$refs.map as Vue).$el) {
      this.rootModule.actions.selectStates([]);
    }
  }

  @Watch('values')
  @Watch('rootModule.state.selection.states')
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

.map {
  background: none;
}

/deep/ .leaflet-control {
  margin: 0;
}

/deep/ path {
  stroke: $color-bg;
  stroke-width: 2px;
  stroke-dasharray: none !important;
}
/deep/ path:hover {
  stroke: $color-text;
  stroke-width: 4px;
}
</style>
