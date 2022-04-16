<template>
  <v-card>
    <v-card-title>{{ item.title }}</v-card-title>
    <v-card-text v-html="content"></v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { markdown } from "../types/index";
import { marked } from "marked";
/**
 * The Markdown card renders the given markdown content.
 * @displayName Markdown
 */
export default Vue.extend({
  name: "Markdown",

  props: {
    /**
     * item for markdown
     */
    item: {
      required: true,
      type: Object as PropType<markdown>,
    },
  },
  computed: {
    content() {
      return marked(this.item.content);
    },
  },
});
</script>