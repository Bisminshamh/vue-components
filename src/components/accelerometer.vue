<template>
  <v-card
    v-bind="cardStyle ? cardStyle : ''"
    class="d-flex flex-column justify-center"
  >
    <v-card-title v-text="item.friendlyName"></v-card-title>
    <v-card-text>
      <v-row justify="center" class="pa-9">
        <!-- <div class="customPosition x_axis">
          <v-card-title v-text="`X : ${transform(item, 0)}`"></v-card-title>
        </div>
        <div class="customPosition y_axis">
          <v-card-title v-text="`Y : ${transform(item, 1)}`"></v-card-title>
        </div>
        <div class="customPosition z_axis">
          <v-card-title v-text="`Z : ${transform(item, 2)}`"></v-card-title>
        </div>
        <v-icon size="100" v-text="item.icon"> </v-icon> -->

        <v-badge
          offset-x="80"
          offset-y="-10"
          :content="`Z : ${transform(item, 2)}`"
          color="transparent"
        >
          <v-badge
            offset-y="15"
              offset-x="-5"

            bottom
            :content="`Y : ${transform(item, 1)}`"
            color="transparent"
          >
            <v-badge
              offset-y="15"
              offset-x="-5"
              bottom
              left
              :content="`X : ${transform(item, 0)}`"
              color="transparent"
            >
              <v-icon size="80">mdi-axis-arrow </v-icon>
            </v-badge>
          </v-badge>
        </v-badge>
      </v-row>
    </v-card-text>
  </v-card>
</template>
<script lang="ts">
import { digital } from "@/types";
import Vue, { PropType } from "vue";
/**
 * The Entity card gives you an overview of your entity’s state.
 * @displayName Accell
 */
export default Vue.extend({
  name: "Accell",

  props: {
    /**
     * item for Digital
     */
    item: {
      required: true,
      type: Object as PropType<digital>,
    },
    cardStyle: {
      required: false,
      type: Object,
    },
  },
  methods: {
    transform(item: any, index: number): number {
      const val = item.value[index] * item.multiplyBy;
      return parseFloat(val.toFixed(item.roundTo));
    },
  },
});
</script>
<style scoped>
/* .parent {
  position: relative;
}
.customPosition {
  position: absolute;
}
.z_axis {
  bottom: -20%;
  left: -25%;
}
.y_axis {
  bottom: -20%;
  left: 25%;
}
.x_axis {
  top: 70%;
  left: 15%;
} */
::v-deep .v-badge__badge {
  color: black;
  font-size: 1.25rem;
}
</style>