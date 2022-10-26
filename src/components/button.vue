<template>
  <v-card>
    <v-hover v-slot="{ hover }">
      <v-card
        @mousedown="change()"
        v-ripple
        flat
        :style="`cursor:${hover ? 'pointer' : ''}`"
      >
        <v-row class="fill-height pt-5" align="center" justify="center">
          <v-col
            cols="6"
            class="d-flex flex-column align-center justify-center"
          >
            <v-icon
              v-if="item.Options.icon.show"
              :size="item.Options.icon.size"
              :color="
                item.status
                  ? item.Options.icon.on.color
                  : item.Options.icon.off.color
              "
            >
              {{
                item.status
                  ? item.Options.icon.on.name
                  : item.Options.icon.off.name
              }}
            </v-icon>
            <v-card-title>{{ item.name }}</v-card-title>
          </v-col>
        </v-row>
      </v-card>
    </v-hover>
    <v-card-actions v-if="isSlider">
      <!-- 
        @slot for passing slider for slider component
        -->
      <slot> </slot>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { button } from "@/types/index";
/**
 * The Button card allows you to add buttons to perform tasks.
 * @displayName Button
 */
export default Vue.extend({
  name: "Button",

  props: {
    /**
     * The item for button card.
     */
    item: {
      required: true,
      type: Object as PropType<button>,
    },
    /**
     * to show/hide v-card-actions
     */
    isSlider: {
      required: false,
      default: false,
      type: Boolean,
    },
  },
  methods: {
    /**
     * called on button click to trigger event
     * @public
     */
    change() {
      /** emitted when button is clicked
       * @event change
       * @type {Event}
       */
      console.log("object");
      this.$emit("change", !this.item.status);
    },
  },
});
</script>