<template>
  <v-card id="chart" v-bind="cardStyle ? cardStyle : ''">
    <VueApexCharts :options="chartOptions" :series="series" />
  </v-card>
</template>
<script lang="ts">
import { gauge } from "@/types";
import Vue, { PropType } from "vue";
import VueApexCharts from "vue-apexcharts";
/**
 * The Gauge card is a basic card that allows visually seeing sensor data.
 * @displayName RadialBar
 */
export default Vue.extend({
  name: "RadialBar",

  components: {
    VueApexCharts,
  },
  props: {
    /**
     * item for gauge
     */
    item: {
      required: true,
      type: Object as PropType<gauge>,
    },
    cardStyle: {
      required: false,
      type: Object,
    },
  },
  data() {
    return {
      series: [this.item.value],
      chartOptions: {
        chart: {
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            hollow: {
              margin: 0,
              size: "70%",
              background: "#fff",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#fff",
              strokeWidth: "47%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: "black",
                fontSize: "17px",
                formatter: () => {
                  return this.item.friendlyName;
                },
              },
              value: {
                formatter: function (val: any) {
                  return parseInt(val);
                },
                color: "#111",
                fontSize: "36px",
                show: true,
              },
            },
          },
        },
        fill: {
          type: "gradient",
          strokeWidth: "47%",
        },
        stroke: {
          lineCap: "round",
        },
      },
    };
  },
});
</script>
