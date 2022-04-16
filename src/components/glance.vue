<template>
  <v-card>
    <v-card-title>{{ item.name }}</v-card-title>
    <v-card-text>
      <v-row>
        <v-col
          class="pa-0 pb-3"
          cols="4"
          v-for="(item, i) in item.items"
          :key="i"
        >
          <v-card flat>
            <v-row class="fill-height" align="center" justify="center">
              <v-col class="d-flex flex-column align-center justify-center">
                <v-card-title class="pa-0 pb-1 subtitle-2">{{
                  item.name | truncate(8, "...")
                }}</v-card-title>
                <v-icon
                  size="30"
                  :color="
                    item.status
                      ? item.Options.icon_color.on
                      : item.Options.icon_color.off
                  "
                >
                  {{
                    item.status ? item.Options.icon.on : item.Options.icon.off
                  }}
                </v-icon>
                <v-card-subtitle class="pa-0 pt-1 caption">{{
                  item.status | truncate(5, "...")
                }}</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { glanceItem } from "../types/index";
/**
 * The Glance card is useful to group multiple sensors in a compact overview.
 * @displayName Glance
 */
export default Vue.extend({
  name: "Glance",

  props: {
    /**
     * The item for glance card.
     */
    item: {
      required: true,
      type: Object as PropType<glanceItem>,
    },
  },
  filters: {
    /**
     * filter to truncate text
     * @param {string} type type of text
     * @param {number} length of text to truncate
     * @param {string} suffix to add at the end
     * @public
     */
    truncate: function (text: string, length: number, suffix: string) {
      if (text.length > length) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    },
  },
});
</script>