<template>
  <v-card>
    <v-list :class="`${type === 'sensor' ? 'pb-0' : ''}`">
      <v-list-item two-line>
        <v-list-item-content :class="`${type === 'sensor' ? 'pb-0' : ''}`">
          <v-list-item-title v-text="item.title"></v-list-item-title>
          <v-list-item-subtitle
            class="text-h5 mt-1"
            v-text="item.value + item.unit"
          ></v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="item.options.icon">
          <v-icon>mdi-information</v-icon>
        </v-list-item-action>
      </v-list-item>
    </v-list>
    <v-card-text class="pa-0" v-if="type === 'sensor'">
      <!-- 
        @slot for passing custom Html Elements
        -->
      <slot> </slot>
    </v-card-text>
  </v-card>
</template><script lang="ts">
import Vue, { PropType } from "vue";
import { entity } from "../types/index";
/**
 * The Entity card gives you an overview of your entity’s state.
 * @displayName Entity
 */
export default Vue.extend({
  name: "Entity",

  props: {
    /**
     * The item for entity card.
     */
    item: {
      required: true,
      type: Object as PropType<entity>,
    },
    type: {
      /**
       * The type of card
       * if true it will show graph
       */
      required: false,
      default: "",
      type: String,
    },
  },
});
</script>