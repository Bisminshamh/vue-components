<template>
  <v-card>
    <v-card-title>{{ item.name }}</v-card-title>
    <v-col cols="12">
      <v-text-field
        hide-details
        v-model="newTodo"
        dense
        solo
        label="Add Todo"
        clearable
        :append-icon="appendIcon"
        @click:append="todo('addTodo', null, newTodo), (newTodo = '')"
        @keypress.enter="
          newTodo.trim() ? (todo('addTodo', null, newTodo), (newTodo = '')) : ''
        "
      ></v-text-field>
    </v-col>
    <v-list class="pa-0">
      <v-subheader>Your Tasks</v-subheader>
      <template v-for="(item, i) in item.items">
        <v-list-item
          @click="todo('completed', item.id)"
          :key="i"
          v-if="!item.status"
        >
          <v-list-item-action>
            <v-checkbox :input-value="item.status" color="primary"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
    <v-divider></v-divider>
    <v-list class="pa-0">
      <v-row>
        <v-col cols="12" class="pr-6 d-flex justify-space-between">
          <v-subheader>Completed </v-subheader>
          <v-btn @click="todo('clear')" icon>
            <v-icon>mdi-notification-clear-all</v-icon>
          </v-btn>
        </v-col>
      </v-row>

      <template v-for="(item, i) in item.items">
        <v-list-item
          @click="todo('incompleted', item.id)"
          :key="i"
          v-if="item.status"
        >
          <v-list-item-action>
            <v-checkbox :input-value="item.status" color="primary"></v-checkbox>
          </v-list-item-action>

          <v-list-item-content>
            <v-list-item-title style="text-decoration: line-through">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-list>
  </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { todo } from "../types/index";
/**
 * The Todo card can used to create shopping list or Todo's
 * @displayName Todo
 */
export default Vue.extend({
  name: "Todo",

  props: {
    /**
     * item for todo
     */
    item: {
      required: true,
      type: Object as PropType<todo>,
    },
  },

  data() {
    return {
      newTodo: "",
    };
  },
  computed: {
    appendIcon() {
      if (this.newTodo === null) return "";
      else if (this.newTodo.trim()) return "mdi-plus";
      else return "";
    },
  },
  methods: {
    /**
     * todo event emitter
     * @public
     * @param {string} type type of event
     * @param {number} id id of item
     * @param {string} title of event
     */
    todo(type: string, id: number, title: string) {
      /**
       * @event change
       * @type {Event}
       */
      this.$emit("change", { type: type, id: id, title: title });
    },
  },
});
</script>