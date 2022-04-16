<template>
  <v-card :min-height="item.height">
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-text>
      <iframe
        width="100%"
        :height="item.height"
        frameborder="0"
        :src="item.src"
      ></iframe
    ></v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { webpage } from "../types/index";
/**
 * The Webpage card to display webpages
 * @displayName Webpage
 */
export default Vue.extend({
  name: "Webpage",

  props: {
    /**
     * item for webpage
     */
    item: {
      required: true,
      type: Object as PropType<webpage>,
    },
  },
});
</script>