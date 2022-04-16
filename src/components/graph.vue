<template>
  <v-card>
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-text>
      <VueApexCharts :options="item.options" :series="item.data" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import VueApexCharts from "vue-apexcharts";
import { graph } from "@/types/index";
/**
 * The Statistics Graph card allows you to display a graph of statistics data for each of the entities listed.
 * @displayName Graph
 */
export default Vue.extend({
  name: "Graph",

  components: {
    VueApexCharts,
  },
  props: {
    /**
     * The item for Graph card.
     */
    item: {
      required: true,
      type: Object as PropType<graph>,
    },
  },
});
</script>
