<template>
  <v-card
    v-bind="cardStyle ? cardStyle : ''"
    class="d-flex flex-column justify-center"
  >
    <v-card-title
      class="py-2"
      :style="`font-size:${font.title}`"
      v-text="item.friendlyName"
    ></v-card-title>
    <v-card-text>
      <v-card-text
      
        class="d-flex flex-row justify-center text-h2 py-10"
        v-text="transform(item)"
      ></v-card-text>
      <!-- <v-row justify="center">
        <v-card-subtitle
          class="text-subtitle-2"
          v-text="item.unit"
        ></v-card-subtitle>
      </v-row> -->
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { analog } from "@/types";
import Vue, { PropType } from "vue";
/**
 * The Entity card gives you an overview of your entity’s state.
 * @displayName Analog
 */
export default Vue.extend({
  name: "Analog",

  props: {
    /**
     * item for Analog
     */
    item: {
      required: true,
      type: Object as PropType<analog>,
    },
    cardStyle: {
      required: false,
      type: Object,
    },
    font: {
      required: false,
      type: Object,
      default() {
        return {
          title: "",
          subtitle: "",
        };
      },
    },
  },
  methods: {
    transform(item: analog): string {
      if (item.roundTo && item.unit)
        return `${parseFloat(this.item.value.toFixed(this.item.roundTo))}  ${
          item.unit
        }`;
      if (item.roundTo)
        return `${parseFloat(this.item.value.toFixed(this.item.roundTo))}`;
      if (item.unit)
        return `${parseFloat(this.item.value.toFixed(this.item.roundTo))}  ${
          item.unit
        }`;
      return `${item.value}`;
    },
  },
});
</script>