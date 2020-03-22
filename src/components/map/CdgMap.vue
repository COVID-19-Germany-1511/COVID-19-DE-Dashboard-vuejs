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
    </l-map>
    <div class="legend">
      <cdg-map-gradient :data="gradientData" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Watch, Mixins } from 'vue-property-decorator';
import { Browser } from 'leaflet';
import { LMap, LGeoJson } from 'vue2-leaflet';
import { extent } from 'geojson-bounds';
import chroma from 'chroma-js';
import 'leaflet/dist/leaflet.css';

import map from '@/data/germany_states_low.geojson';

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
        const name = feature.properties?.NAME_1 as string;
        const style = this.rootModule.getters.isStateSelected(name)
          ? STYLE_SELECTED
          : this.defaultStyle;
        return {
          ...style,
          fillColor: this.getColor(this.values[name]),
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

  get values(): { [key: string]: number } {
    const result: any = {};
    Object.entries(this.rootModule.getters.dataOfDayAndType).forEach(
      ([key, value]) => {
        result[key] = value[this.subType];
      },
    );
    return result;
  }

  get type() {
    return this.rootModule.state.selection.type;
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
    return chroma.scale(['fff', COLORS[this.type]]);
  }

  get min() {
    return Math.min(...Object.values(this.values));
  }

  get max() {
    return this.rootModule.getters.selectedAllTimeStateMax[this.subType];
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
  }

  onClick({ target, originalEvent }: L.LeafletMouseEvent) {
    originalEvent.stopPropagation();
    const name = target.feature.properties?.NAME_1;
    this.rootModule.actions.toggleStateSelection(name);
    if (this.rootModule.getters.isStateSelected(name)) {
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
