<template>
  <v-card
    v-bind="cardStyle ? cardStyle : ''"
    class="d-flex flex-column justify-center"
  >
    <v-card-title v-text="item.friendlyName"></v-card-title>
    <v-card-text>
      <v-row justify="center">
        <v-icon size="80">{{
          item.value ? item.icon.true : item.icon.false
        }}</v-icon>
      </v-row>
      <v-row justify="center">
        <v-card-subtitle
          class="text-subtitle-2"
          v-text="item.value ? item.text.true : item.text.false"
        ></v-card-subtitle>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { digital } from "@/types";
import Vue, { PropType } from "vue";
/**
 * The Entity card gives you an overview of your entity’s state.
 * @displayName Digital
 */
export default Vue.extend({
  name: "Digital",

  props: {
    /**
     * item for Digital
     */
    item: {
      required: true,
      type: Object as PropType<digital>,
    },
    cardStyle: {
      required: false,
      type: Object,
    },
  },
});
</script>