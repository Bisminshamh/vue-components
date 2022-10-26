<template>
  <v-card>
    <v-list>
      <v-card-title class="ma-0">{{ item.title }} </v-card-title>

      <v-list-item v-for="(item, i) in item.items" :key="i">
        <v-list-item-icon>
          <v-icon :color="icon(item, 'color')">
            {{ icon(item, "name") }}
          </v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="text-xl-body-1" v-text="item.title"></v-list-item-title>
        </v-list-item-content>

        <v-list-item-action>
          <v-switch v-if="item.options.isSwitchable" v-model="item.value"></v-switch>
          <v-chip outlined v-else>
            <v-list-item-action-text class="text-h6" v-text="item.value + ' ' + (item.unit ? item.unit : '')">
            </v-list-item-action-text>
          </v-chip>
        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import {
  entities,
  entitiesItem,
  icon_key,
  icon_object_key,
} from "../types/index";
/**
 * The Entity card gives you an overview of your entity’s state.
 * @displayName Entities
 */
export default Vue.extend({
  name: "Entities",

  props: {
    /**
     * item for entities
     */
    item: {
      required: true,
      type: Object as PropType<entities>,
    },
  },

  methods: {
    /**
     * display icon based on condition
     * @param {entitiesItem} item Entity item
     * @param {icon_key} name function executes bases on value of the name {icon/icon_color}
     */
    icon(item: entitiesItem, name: icon_key): string {
      switch (item.options.isSwitchable) {
        case true:
          return this.Color_Icon(item, name, item.value ? "on" : "off");
        case false:
          switch (item.options.condition) {
            case "<":
              if (item.options.conditionValue)
                return this.Color_Icon(
                  item,
                  name,
                  item.value < item.options.conditionValue ? "on" : "off"
                );
              break;
            case ">":
              if (item.options.conditionValue)
                return this.Color_Icon(
                  item,
                  name,
                  item.value > item.options.conditionValue ? "on" : "off"
                );
              break;
            case "===":
              if (item.options.conditionValue)
                return this.Color_Icon(
                  item,
                  name,
                  item.value === item.options.conditionValue ? "on" : "off"
                );
              break;
            default:
              return this.Color_Icon(item, name, "on");
          }
          return "";
        default:
          return this.Color_Icon(item, name, "on");
      }
    },
    /**
     * return statement for icon function
     * @param {entitiesItem} item Entity item
     * @param {icon_object_key} type Entity item value
     * @param {icon_key} name function executes bases on value of the name {icon/icon_color}
     */
    Color_Icon(
      item: entitiesItem,
      name: icon_key,
      type: icon_object_key
    ): string {
      const iconData = item.options.icon[type];

      if (typeof iconData === 'object' && 'icon' in iconData && 'icon_color' in iconData) {
        // Type assertion for the first case: { icon: string; icon_color: string; }
        return (iconData as { icon: string; icon_color: string })[name];
      } else {
        // Type assertion for the second case: { name: string; color: string; }
        return (iconData as { [key: string]: string })[name];
      }
    }

  },
});
</script>