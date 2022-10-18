<template>
  <v-card
    :height="item.options.height"
    v-bind="item.options.style ? item.options.style.v_card : ''"
    style="z-index: 0"
  >
    <v-card-title v-if="item.options.header">{{ item.title }}</v-card-title>
    <l-map
      :zoom="zoom"
      :center="center"
      :bounds="bounds"
      :worldCopyJump="true"
      :minZoom="3"
    >
      <l-tile-layer
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
      ></l-tile-layer>
      <l-marker-cluster color="black">
        <l-circle-marker
          v-for="(item, i) in item.items"
          :key="i"
          :lat-lng="[item.lat, item.long]"
          :radius="7"
          :color="item.isOnline ? 'green' : 'red'"
          :fillColor="item.isOnline ? 'green' : 'red'"
          :fillOpacity="1"
        >
          <l-tooltip>
            <!-- for tooltip -->
            <slot :item="item"></slot>
          </l-tooltip>
        </l-circle-marker>
      </l-marker-cluster>
    </l-map>
  </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { map } from "@/types/index";
import { latLngBounds } from "leaflet";
import { LMap, LTileLayer, LCircleMarker, LTooltip } from "vue2-leaflet";
import Vue2LeafletMarkerCluster from "vue2-leaflet-markercluster";
/**
 * The Map card to display all the location on a map interface
 * @displayName Map
 */
export default Vue.extend({
  components: {
    LMap,
    LTileLayer,
    LCircleMarker,
    LTooltip,
    "l-marker-cluster": Vue2LeafletMarkerCluster,
  },
  props: {
    /**
     * item for map
     */
    item: {
      required: true,
      type: Object as PropType<map>,
    },
  },
  data() {
    return {
      zoom: 5,
      center: [0, 0],
      tileProvider: {
        attribution:
          '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
        url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      },
    };
  },

  computed: {
    //calculate bounds based on lat long
    bounds() {
      let lat_long = [] as any;
      this.item.items.forEach((device) => {
        lat_long.push([device.lat, device.long]);
      });
      if (lat_long.length > 0) return latLngBounds([lat_long]);
      //latlong bound for india
      return latLngBounds([
        [23.63936, 68.14712],
        [28.20453, 97.34466],
      ]);
    },
  },
});
</script>

<style>
@import "~leaflet/dist/leaflet.css";
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
</style>