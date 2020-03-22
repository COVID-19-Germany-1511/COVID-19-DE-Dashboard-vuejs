declare module '*.vue' {
  import Vue from 'vue';
  export default Vue;
}

declare module '*.geojson' {
  const a: GeoJSON.FeatureCollection;
  export default a;
}

declare module 'vue2-leaflet' {
  import * as L from 'leaflet';
  export { L };
}

declare module 'geojson-bounds' {
  export function extent(geoJson: GeoJSON.FeatureCollection): number[];
}
