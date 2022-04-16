<template>
  <v-card>
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-text>
      <v-row align="center" justify="space-between">
        <v-col
          class="d-flex justify-center"
          :cols="cols"
          v-for="i in item.totalItems"
          :key="i"
        >
          <slot :name="i"> </slot>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue from "vue";
import { PropType } from "vue/types/umd";
import { horizontal_card } from "@/types/index";
/**
 * The Horizontal Stack card allows you to stack together multiple cards, so they always sit next to each other.
 * @displayName Horizontal Stack
 */
export default Vue.extend({
  props: {
    /**
     * item for todo
     */
    item: {
      required: true,
      type: Object as PropType<horizontal_card>,
    },
  },
  computed: {
    /**
     * to return cols based on total item
     */
    cols() {
      switch (this.item.totalItems) {
        case 1:
          return "12";
        case 2:
          return "6";
        case 3:
          return "4";
        case 4:
          return "3";
        case 5:
        case 6:
          return "2";
        default:
          return "";
      }
    },
  },
});
</script>