<template>
  <Button :item="item" @change="change" :isSlider="true">
    <v-slider
      :disabled="!item.status"
      class="mx-15"
      v-model="item.range"
      @input="range"
    ></v-slider>
  </Button>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import Button from "../components/button.vue";
import { slider } from "../types/index";
/**
 * Slider in a button card.
 * @displayName Slider
 */
export default Vue.extend({
  name: "Slider",

  components: {
    Button,
  },

  props: {
    /**
     * The prop item for slider card.
     */
    item: {
      required: true,
      type: Object as PropType<slider>,
    },
  },

  methods: {
    /**
     * method for emitting events of button card
     * @public
     */
    change() {
      /** Triggered when button is clicked
       * @event change
       * @type {Event}
       */
      this.$emit("change", !this.item.status);
    },

    /**
     * method for emitting events of slider card
     * @public
     * @argument(value:number)
     */
    range(value: number) {
      /** Triggered when button is clicked
       * @event range
       * @type {Event}
       */
      this.$emit("range", value);
    },
  },
});
</script>