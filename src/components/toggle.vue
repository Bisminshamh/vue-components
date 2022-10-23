<template>
  <v-card
    v-bind="cardStyle ? cardStyle : ''"
    class="d-flex flex-column justify-center"
  >
    <v-card-title v-text="item.friendlyName"></v-card-title>
    <v-card-text>
      <v-row justify="center">
        <v-switch @change="emit(item)" v-model="value" inset></v-switch>
      </v-row>
      <v-row justify="center">
        <v-col class="d-flex justify-center">
          <v-card-subtitle class="pl-0 text-subtitle-2">{{
            item.value ? item.text.true : item.text.false
          }}</v-card-subtitle>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { toggle } from "@/types";
import Vue, { PropType } from "vue";
/**
 * The Entity card gives you an overview of your entity’s state.
 * @displayName Toggle
 */
export default Vue.extend({
  name: "Toggle",

  props: {
    /**
     * item for Toggle
     */
    item: {
      required: true,
      type: Object as PropType<toggle>,
    },
    cardStyle: {
      required: false,
      type: Object,
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
    dummy(item: toggle) {
      console.log(item);
    },
  },
});
</script>

<style scoped>
/* to increade switch size */
::v-deep .v-input--selection-controls__ripple {
  width: 0px;
}

::v-deep .v-input--switch__thumb {
  top: calc(50% - 20px);
  height: 45px;
  width: 45px;
}

::v-deep .v-input--switch--inset .v-input--switch__track {
  border-radius: 35px;
  height: 60px;
  width: 120px;
  top: calc(50% - 28px);
}

::v-deep .v-input--switch.v-input--is-dirty .v-input--switch__thumb {
  transform: translate(60px, 0) !important;
}
::v-deep .v-input__slot {
  width: 120px;
  height: 50px;
}
</style>