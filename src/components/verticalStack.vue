<template>
  <v-card>
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          class="d-flex justify-center"
          cols="12"
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
import { vertical_card } from "@/types/index";
/**
 * The Vertical Stack card allows you to group multiple cards so they always sit in the same column.
 * @displayName Vertical stack
 */
export default Vue.extend({
  name: "VerticalStack",
  props: {
    item: {
      required: true,
      type: Object as PropType<vertical_card>,
    },
  },
});
</script>