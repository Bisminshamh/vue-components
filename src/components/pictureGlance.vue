<template>
  <v-card>
    <slot></slot>
    <v-card-actions style="overflow: hidden">
      <v-card-title class="py-0 pl-0">{{ item.title }}</v-card-title>
      <v-spacer></v-spacer>
      <v-btn
        v-for="(element, i) in item.items"
        :key="i"
        icon
        @click="clicked(element)"
      >
        <v-icon
          :color="element.status ? element.iconColor.on : element.iconColor.off"
          >{{ element.status ? element.icon.on : element.icon.off }}</v-icon
        >
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
</script>
<script lang="ts">
import Vue, { PropType } from "vue";
import { pictureGlance } from "../types/index";
/**
 * The Picture Glance card shows an image and corresponding entity states as an icon.
 * @displayName Music Player
 */
export default Vue.extend({
  name: "MusicPlayer",

  props: {
    /**
     * item for music pictureGlance
     */
    item: {
      required: true,
      type: Object as PropType<pictureGlance>,
    },
  },
  methods: {
    /**
     * display icon based on condition
     * @param {string} item.id item id
     * @param {boolean} item.status item status
     */
    clicked(item: { id: string; status: boolean }) {
      /**
       * @event clicked
       * @type {Event}
       */
      this.$emit("clicked", { id: item.id, status: !item.status });
    },
  },
});
</script>