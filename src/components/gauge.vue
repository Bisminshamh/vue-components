<template>
  <v-card>
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-text>
      <VueApexCharts :options="chartOptions" :series="series" />
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import VueApexCharts from "vue-apexcharts";
import { gauge } from "@/types/index";
/**
 * The Gauge card is a basic card that allows visually seeing sensor data.
 * @displayName Gauge
 */
export default Vue.extend({
  name: "Sensor",

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
  },
  data() {
    return {
      series: [this.item.value],
      chartOptions: {
        chart: {
          type: "radialBar",
          offsetY: -20,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "100%",
              margin: 5, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 2,
                left: 0,
                color: "#999",
                opacity: 1,
                blur: 2,
              },
            },
            dataLabels: {
              name: {
                show: true,
                offsetY: 30,
                fontSize: "15px",
                color: "black",
                formatter: () => {
                  return this.item.name;
                },
                value: "sss",
              },
              value: {
                offsetY: -20,
                fontSize: "22px",
                formatter: (value: any) => {
                  return `${value} ${this.item.unit}`;
                },
              },
            },
          },
        },
        grid: {
          padding: {
            top: -20,
          },
        },
        fill: {
          type: "solid",
          colors: undefined,
        },
      },
    };
  },
});
</script>
