<template>
  <v-card>
    <v-card-title>{{ item.name }}</v-card-title>
    <v-card-subtitle>{{ item.Date }}</v-card-subtitle>
    <v-divider></v-divider
    ><v-list two-line>
      <template v-for="(data, i) in item.items">
        <v-list-item :key="i">
          <v-list-item-avatar>
            <v-icon>{{ data.icon }}</v-icon>
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-text="data.title"></v-list-item-title>

            <v-list-item-subtitle v-text="data.Date"></v-list-item-subtitle>

            <v-list-item-subtitle v-text="data.subtitle"></v-list-item-subtitle>
          </v-list-item-content>
          <v-list-item-action>
            <v-chip>{{ data.status }}</v-chip>
          </v-list-item-action>
        </v-list-item>

        <v-divider
          v-if="i < item.items.length - 1"
          :key="data.name"
        ></v-divider>
      </template>
    </v-list>
  </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { logbookItem } from "../types/index";
/**
 * The Logbook give you all the logs of the data change
 * @displayName Logbook
 */
export default Vue.extend({
  name: "Logbook",

  props: {
    /**
     * item for logbook
     */
    item: {
      required: true,
      type: Object as PropType<logbookItem>,
    },
  },
});
</script>