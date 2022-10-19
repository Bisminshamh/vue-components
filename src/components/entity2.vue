<template>
  <v-card v-bind="item.options.style.v_card">
    <v-list>
      <v-list-item>
        <v-list-item-icon>
          <v-icon
            :size="item.options.icon.size"
            :color="
              item.value
                ? item.options.icon.on.color
                : item.options.icon.off.color
            "
          >
            {{
              item.value
                ? item.options.icon.on.name
                : item.options.icon.off.name
            }}
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            class="text-xl-body-1"
            v-text="item.name"
          ></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action v-if="item.options.isSwitchable">
          <v-switch @change="emit(item)" v-model="value"></v-switch>
        </v-list-item-action>
        <v-list-item-action>
          <v-chip outlined>
            <v-list-item-action-text class="text-h6"
              >{{ item.options.text.custom ? transform(item) : item.value }}
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
      if (typeof item.value === "number")
        return Math.round(item.value) + " " + (item.unit ? item.unit : "");
      else {
        return item.value ? item.options.text.true : item.options.text.false;
      }
    },
  },
});
</script>