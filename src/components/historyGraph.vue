<template>
  <Graph :item="GraphItem" />
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import Graph from "@/components/graph.vue";
import { history_graph } from "@/types";
export default Vue.extend({
  components: { Graph },
  props: {
    item: {
      required: true,
      type: Object as PropType<history_graph>,
    },
  },
  data() {
    return {
      GraphItem: {
        title: "HistoryGraph",
        options: {
          chart: {
            toolbar: {
              show: false,
            },
            height: "150",
            type: "rangeBar",
          },
          plotOptions: {
            bar: {
              horizontal: true,
              barHeight: "30%",
              rangeBarGroupRows: true,
            },
          },
          colors: ["#29fc16", "#fc0a1a"],
          xaxis: {
            type: "datetime",
            labels: {
              show: true,
              rotate: 0,
              rotateAlways: true,
              // format: "dd/MM/yy HH:mm",
              format: "H:m TT",
            },
          },
          stroke: {
            width: 0,
          },
          fill: {
            type: "solid",
            opacity: 1,
          },
          legend: {
            position: "top",
            horizontalAlign: "center",
          },
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            enabled: true,
            x: {
              format: "MMM dd, yyyy h:m:s TT",
            },
            fixed: {
              enabled: true,
              position: "topRight",
            },
            items: {
              display: "flex",
            },
          },
        },
        data: this.item.data,
      },
    };
  },
});
</script>