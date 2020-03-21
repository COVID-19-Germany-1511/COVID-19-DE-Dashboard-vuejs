declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module 'vue-choropleth' {
  type InfoControl = any;
  type ReferenceChart = any;
  type ChoroplethLayer = any;
  export const InfoControl: InfoControl;
  export const ReferenceChart: ReferenceChart;
  export const ChoroplethLayer: ChoroplethLayer;
}

declare module '*.geojson' {
  const a: GeoJSON.FeatureCollection;
  export default a;
}

declare module 'vue2-leaflet' {
  import * as L from 'leaflet';
  export { L };
}
