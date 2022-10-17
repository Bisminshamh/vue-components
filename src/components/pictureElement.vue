<template>
  <v-card>
    <v-card-title>{{ item.title }}</v-card-title>
    <v-img :src="item.src" class="customPosition">
      <div
        v-for="(item, i) in item.icons"
        :key="i"
        class="customPosition"
        :style="`top:${item.position.top}%;transform: rotate(${item.position.rotate}deg);;left:${item.position.left}%;`"
      >
        <v-btn icon @click="clicked(item)">
          <v-icon :color="item.status ? item.on.color : item.off.color">{{
            item.status ? item.on.name : item.off.name
          }}</v-icon>
        </v-btn>
      </div>
    </v-img>
  </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { pictureElement, pictureElementIconItem } from "@/types/index";
/**
 * The cards allow you to position icons on an image.
 * @displayName Picture Element
 */
export default Vue.extend({
  props: {
    /**
     * The item for Picture Element card.
     */
    item: {
      required: true,
      type: Object as PropType<pictureElement>,
    },
  },

  methods: {
    /**
     * Method to trigger event
     * @param {pictureElementIconItem} item type of action
     * @public
     */
    clicked(item: pictureElementIconItem) {
      /** emit when button is clicked
       * @event clicked
       * @type {Event}
       * @param {number} id id of item
       * @param {boolean} status status of item
       */
      this.$emit("clicked", { id: item.id, status: !item.status });
    },
  },
});
</script>
<style scoped>
.customPosition {
  position: absolute;
}
</style>