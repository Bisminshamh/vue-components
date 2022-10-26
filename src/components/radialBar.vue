<template>
  <v-card id="chart" v-bind="cardStyle ? cardStyle : ''">
    <VueApexCharts :options="chartOptions" :series="series" />
  </v-card>
</template>
<script lang="ts">
import { radialBar } from "@/types";
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
      type: Object as PropType<radialBar>,
    },
    cardStyle: {
      required: false,
      type: Object,
    },
    value: {
      required: false,
      default() {
        return {
          show: true,
          offsetY: 20,
          fontSize: "2rem",
        };
      },
      type: Object,
    },
    dataLabels: {
      required: false,
      default() {
        return {
          offsetY: -10,
          show: true,
          fontSize: "17px",
        };
      },
      type: Object,
    },
  },
  data() {
    return {
      series: [
        (this.item.value * this.item.multiplyBy * 100) / this.item.maxRange,
      ],
      chartOptions: {
        chart: {
          type: "radialBar",
        },
        plotOptions: {
          radialBar: {
            range: [0, 1000],
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
                show: this.dataLabels.show,
                offsetY: this.dataLabels.offsetY,
                fontSize: this.dataLabels.fontSize,
                color: "black",
                fontWeight: "bold",
                formatter: () => {
                  return this.item.friendlyName;
                },
              },
              value: {
                formatter: () => {
                  const val = this.item.value * this.item.multiplyBy;
                  if (this.item.roundTo && this.item.unit)
                    return `${parseFloat(val.toFixed(this.item.roundTo))}  ${
                      this.item.unit
                    }`;
                  if (this.item.roundTo)
                    return `${parseFloat(val.toFixed(this.item.roundTo))}`;
                  if (this.item.unit) return `${val}  ${this.item.unit}`;
                  return `${this.item.value}`;
                },
                color: "black",
                show: this.value.show,
                offsetY: this.value.offsetY,
                fontSize: this.value.fontSize,
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
  watch: {
    //update chart series
    "item.value"(val: any) {
      this.series = [(val * this.item.multiplyBy * 100) / this.item.maxRange];
    },
  },
});
</script>
