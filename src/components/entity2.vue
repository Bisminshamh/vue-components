<template>
  <v-card v-bind="cardStyle ? cardStyle : ''">
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon :size="42" :color="item.value ? 'iconOn' : 'iconOff'">
            {{ item.value ? item.icon.true : item.icon.false }}
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            class="text-xl-body-1"
            v-text="item.friendlyName"
          ></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action v-if="item.isSwitchable">
          <v-switch @change="emit(item)" v-model="value"></v-switch>
        </v-list-item-action>
        <v-list-item-action>
          <v-chip outlined>
            <v-list-item-action-text class="text-h6"
              >{{ transform(item) }}
            </v-list-item-action-text>
          </v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script lang="ts">
import { entity2 } from "@/types";
import Vue, { PropType } from "vue";
/**
 * The Entity card gives you an overview of your entity’s state.
 * @displayName Entities
 */
export default Vue.extend({
  name: "Entity2",

  props: {
    /**
     * item for entities
     */
    item: {
      required: true,
      type: Object as PropType<entity2>,
    },
    cardStyle: {
      required: false,
      type: Object,
    },
    isSwitchable: {
      default: false,
      required: false,
      type: Boolean,
    },
  },
  computed: {
    value: {
      get() {
        return this.item.value;
      },
      set(v) {
        console.log(v);
      },
    },
  },
  methods: {
    emit(data: any) {
      this.$emit("change", data);
    },
    transform(item: entity2): string {
      if (typeof item.value != "number")
        return item.value ? item.text.true : item.text.false;

      if (item.roundTo && item.unit)
        return `${Number(item.value).toFixed(item.roundTo)}  ${item.unit}`;

      if (item.roundTo) return `${Number(item.value).toFixed(item.roundTo)}`;

      if (item.unit) return `${Number(item.value)}  ${item.unit}`;

      return `${item.value}`;
    },
  },
});
</script>