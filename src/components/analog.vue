<template>
  <v-card
    v-bind="cardStyle ? cardStyle : ''"
    class="d-flex flex-column justify-center"
  >
    <v-card-title v-text="item.friendlyName"></v-card-title>
    <v-card-text>
      <v-card-text
        class="d-flex flex-row justify-center text-h2"
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
  },
  methods: {
    transform(item: analog): string {
      return `${Number(item.value).toFixed(item.roundTo)}  ${item.unit}`;
    },
  },
});
</script>