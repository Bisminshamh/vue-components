<template>
  <v-card width="100%">
    <v-card-title>{{ item.title }} </v-card-title>
    <v-window v-model="window">
      <v-window-item>
        <v-card height="200" flat>
          <v-row class="fill-height" align="center" justify="center">
            
            <!-- phone button -->
            <v-btn
              class="mybutton"
              color="green"
              depressed
              fab
              x-large
              @click="control('call-connect')"
            >
              <v-icon color="white" x-large> mdi-phone </v-icon>
            </v-btn>
            <!-- /phone button -->
          </v-row>
        </v-card>
      </v-window-item>
      <v-window-item>
        <v-lazy
         v-model="isActive"
          :options="{
            threshold: 1,
          }"
        >
          <v-card height="200" flat>
            <v-row class="fill-height" align="center" justify="center">
              
              <!-- volume button -->
              <v-btn
                :elevation="1"
                color="white"
                fab
                small
                @click="isMuted = !isMuted"
                class="mybutton mt-9"
              >
                <v-icon size="26" v-if="isMuted">mdi-volume-off</v-icon>
                <v-icon size="26" v-else>mdi-volume-high</v-icon>
              </v-btn>
              <!-- /volume button -->


              <!-- phone button -->
              <v-btn
                :elevation="1"
                color="red"
                fab
                x-large
                @click="control('call-disconnect')"
                class="mybutton mx-8"
              >
                <v-icon color="white" x-large>mdi-phone-hangup</v-icon>
              </v-btn>
              <!-- /phone button -->


              <!-- mic button -->
              <v-btn
                color="white"
                :elevation="1"
                fab
                small
                @click="isMicOn = !isMicOn"
                class="mybutton mt-9"
              >
                <v-icon size="26" v-if="isMicOn">mdi-microphone</v-icon>
                <v-icon size="26" v-else>mdi-microphone-off</v-icon>
              </v-btn>
              <!-- /mic button -->

            </v-row>
          </v-card>
        </v-lazy>
      </v-window-item>
    </v-window>
  </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { audioItem } from "../types/index.js";
/**
 * Two way Audio component with controls
 * @displayName Audio
 */
export default Vue.extend({
  name: "Audio",
  data() {
    return {
      isMuted: false,
      isMicOn: false,
      window: 0,
      isActive:true
    };
  },

  props: {
    /**
     * The item for audio.
     */
    item: {
      required: true,
      type: Object as PropType<audioItem>,
    },
    /**
     * Call connected prop.
     */
    callConnected: {
      required: true,
      default: false,
      type: Boolean,
    },
  },
  /**
   * watch callConnected prop change
   */
  watch: {
    /**
     * watch callConnected prop change
     */
    callConnected(value: boolean) {
      switch (value) {
        case true:
          this.window = 1;
          break;

        case false:
          this.window = 0;
          break;
      }
    },
    /**
     * watch isMuted data change
     */
    isMuted(val: boolean): void {
      this.control(val ? "muted" : "unmuted");
    },
    /**
     * watch isMicOn data change
     */
    isMicOn(val: boolean): void {
      this.control(val ? "mic-on" : "mic-off");
    },
  },
  methods: {
    /**
     * Emit event on {call ,hang up, speaker, mic} button press
     */
    control(name: string) {
      this.$emit("buttonEvent", { type: name });
    },
  },
});
</script>
<style scoped>
/* Bug fix */
/* Fab buttons stay highlighted after being clicked {vuetify-issue:#3125} */
.mybutton:focus::before {
  opacity: 0 !important;
}
</style>