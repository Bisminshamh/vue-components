<template>
  <Entity :item="item.entity" :type="'sensor'">
    <VueApexCharts
      height="100%"
      type="area"
      :options="chartOptions"
      :series="series"
    />
  </Entity>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Entity from "@/components/entity.vue";
import VueApexCharts from "vue-apexcharts";
import { sensor } from "@/types/index";
/**
 * An Entity component with graph to show the value
 * @displayName Sensor
 */
export default Vue.extend({
  name: "Sensor",

  components: {
    Entity,
    VueApexCharts,
  },
  props: {
    /**
     * The item for Sensor card.
     */
    item: {
      required: true,
      type: Object as PropType<sensor>,
    },
  },
  data() {
    return {
      chartOptions: {
        xaxis: {
          categories: this.item.graph.categories,
          labels: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        chart: {
          toolbar: {
            show: false,
          },
          width: "100%",
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: false,
          padding: {
            top: -25,
            right: 0,
            bottom: 0,
            left: -10,
          },
        },
        noData: {
          text: "No Data",
          align: "center",
          verticalAlign: "middle",
          offsetX: 0,
          offsetY: 0,
          style: {
            color: undefined,
            fontSize: "14px",
            fontFamily: undefined,
          },
        },
      },
      series: this.item.graph.series,
    };
  },
  created() {
    /**
     * to Update the apexchart padding option on breakpoint change
     */
    switch (this.$vuetify.breakpoint.name) {
      case "xs":
      case "sm":
      case "md":
      case "lg":
        this.chartOptions.grid.padding.bottom = -30;
        break;
      case "xl":
        this.chartOptions.grid.padding.bottom = -14;
        break;
    }
  },
});
</script>
