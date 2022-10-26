<template>
  <v-card id="chart" v-bind="cardStyle ? cardStyle : ''">
    <v-card-title
      class="py-0 pt-4"
      :style="`font-size:${font.title}`"
      v-text="item.friendlyName"
    ></v-card-title>
    <v-card-text class="pt-0">
      <VueApexCharts :options="chartOptions" :series="series" />
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { radialBar } from "@/types";
import Vue, { PropType } from "vue";
import VueApexCharts from "vue-apexcharts";
/**
 * The Gauge card is a basic card that allows visually seeing sensor data.
 * @displayName Gauge
 */
export default Vue.extend({
  name: "Gauge",

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
          offsetY: -20,
          fontSize: "2rem",
        };
      },
      type: Object,
    },
    dataLabels: {
      required: false,
      default() {
        return {
          show: false,
          offsetY: 0,
          fontSize: "2rem",
        };
      },
      type: Object,
    },
    font: {
      required: false,
      type: Object,
      default() {
        return {
          title: "",
        };
      },
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
          offsetY: -25,
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
                show: this.dataLabels.show,
                offsetY: this.dataLabels.offsetY,
                fontSize: this.dataLabels.fontSize,
                color: "black",
                fontWeight: "normal",
                formatter: () => {
                  return this.item.friendlyName;
                },
              },
              value: {
                show: this.value.show,
                offsetY: this.value.offsetY,
                fontSize: this.value.fontSize,
                color: "black",
                formatter: () => {
                  const val = this.item.value * this.item.multiplyBy;
                  if (this.item.roundTo && this.item.unit)
                    return `${parseFloat(val.toFixed(this.item.roundTo))}  ${
                      this.item.unit
                    }`;
                  if (this.item.roundTo)
                    return `${parseFloat(val.toFixed(this.item.roundTo))}`;
                  if (this.item.unit) return `${val}  ${this.item.unit}`;
                  return `${val}`;
                },
              },
            },
          },
        },
        grid: {
          padding: {
            top: 0,
            bottom: 0,
          },
        },
        fill: {
          type: "gradient",
          color: "white",
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
