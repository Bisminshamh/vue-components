<template>
  <v-card v-bind="item.options.style.v_card" class="d-flex flex-row justify-center">
    <VueApexCharts :options="chartOptions" :series="series" height="330" />
  </v-card>
</template>
<script lang="ts">
import { gauge } from "@/types";
import Vue, { PropType } from "vue";
import VueApexCharts from "vue-apexcharts";
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
          offsetY: -15,
          sparkline: {
            enabled: true,
          },
          height: "500",
        },
        plotOptions: {
          radialBar: {
            startAngle: -90,
            endAngle: 90,
            track: {
              background: "#e7e7e7",
              strokeWidth: "100%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: 0,
                left: 0,
                color: "#999",
                opacity: 0,
                blur: 0,
              },
            },
            dataLabels: {
              name: {
                show: true,
                offsetY: 20,
                fontSize: "15px",
                color: "black",
                fontWeight: "normal",
                formatter: () => {
                  return this.item.name;
                },
              },
              value: {
                offsetY: -25,
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
          type: "gradient",
          gradient: {
            shade: "light",
            shadeIntensity: 0.4,
            inverseColors: false,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 53, 91],
          },
        },
      },
    };
  },
});
</script>
