<template>
  <v-card :elevation="0" v-if="conditionCheck">
    <component
      :is="componentFile"
      :item="item.item"
      v-dynamic-events="knownEvents"
    >
      <slot></slot>
    </component>
  </v-card>
</template>
<script>
</script>
<script lang="ts">
import Vue, { PropType } from "vue";
import { conditional } from "@/types/index";
/**
 * The Conditional card cards based on condition
 * @displayName Conditional
 */
export default Vue.extend({
  name: "Conditional",
  directives: {
    //dynamic event handling
    DynamicEvents: {
      bind: (binding: any, vnode: any) => {
        const allEvents = binding.value;
        Object.keys(allEvents).forEach((event) => {
          // register handler in the dynamic component
          vnode.componentInstance.$on(event, (eventData: PropType<any>) => {
            const targetEvent = allEvents[event];
            vnode.context[targetEvent](eventData);
          });
        });
      },
      unbind: function (vnode: any) {
        vnode.componentInstance.$off();
      },
    },
  },
  data() {
    return {
      knownEvents: {
        clicked: "handleMyEvent",
      },
    };
  },
  props: {
    /**
     * item for Conditional card
     */
    item: {
      required: true,
      type: Object as PropType<conditional>,
    },
  },
  computed: {
    //load component file
    componentFile() {
      return () => import(`./${this.item.type}.vue`);
    },
    //condition checking
    conditionCheck() {
      return this.item.condition.reduce(
        (acc, currentElement) => acc && currentElement,
        true
      );
    },
  },
  methods: {
    /**
     * event handling method
     * @public
     * @param {object} value event data
     */
    handleMyEvent(value: object) {
      /**
       * @event events
       * @type {Event}
       */
      this.$emit("events", value);
    },
  },
});
</script>