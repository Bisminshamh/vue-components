<template>
  <v-card>
    <v-card-title
      >Alarm
      <v-spacer></v-spacer>
      <v-tooltip bottom :color="item.armed ? 'error' : 'success'">
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            v-bind="attrs"
            v-on="on"
            x-large
            :color="item.armed ? 'error' : 'success'"
            >{{ item.armed ? "mdi-shield-lock" : "mdi-shield-check" }}</v-icon
          >
        </template>
        <span>{{ item.armed ? "Armed" : "Disarmed" }}</span>
      </v-tooltip>
    </v-card-title>

    <v-card-text class="d-flex justify-center">
      <v-btn
        @click="action({ type: buttonText })"
        outlined
        :color="buttonText === 'Arm' ? 'success' : 'error'"
        rounded
        x-large
        >{{ buttonText }}</v-btn
      >
    </v-card-text>
    <v-expand-transition>
      <v-row justify="center" v-if="item.authentication">
        <v-col lg="9" sm="10" cols="9">
          <v-card flat>
            <v-card-text>
              <v-row justify="center">
                <v-col cols="8">
                  <v-row>
                    <v-form lazy-validation v-model="valid" ref="form">
                      <v-text-field
                        :rules="rule"
                        v-model="pin"
                        solo
                        dense
                        disabled
                      >
                      </v-text-field>
                    </v-form>
                  </v-row>
                </v-col>
              </v-row>
              <v-row justify="center">
                <v-col
                  class="d-flex justify-center pa-2"
                  cols="4"
                  v-for="(item, i) in numbers"
                  :key="i"
                >
                  <v-btn v-if="item.type === 'number'" @click="action(item)">{{
                    item.value
                  }}</v-btn>

                  <v-btn @click="action(item)" v-else>
                    <v-icon small>{{ item.value }}</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-expand-transition>
  </v-card>
</template>
<script lang="ts">
import Vue, { PropType } from "vue";
import { alarm } from "@/types/index";
/**
 * The Alarm card allows you to arm and disarm your alarm integrations.
 * @displayName Alarm
 */
export default Vue.extend({
  name: "Alarm",
  data() {
    return {
      valid: true,
      rule: [(v: number) => !!v || "Enter the Pin"],
      buttonText: this.item.armed ? "Disarm" : "Arm",
      showKeypad: false,
      numbers: [
        { type: "number", value: "1" },
        { type: "number", value: "2" },
        { type: "number", value: "3" },
        { type: "number", value: "4" },
        { type: "number", value: "5" },
        { type: "number", value: "6" },
        { type: "number", value: "7" },
        { type: "number", value: "8" },
        { type: "number", value: "9" },
        { type: "reset", value: "mdi-lock-reset" },
        { type: "number", value: "0" },
        { type: "clear", value: "mdi-backspace" },
      ],
      pin: "",
      pinlength: 0,
      form: "" as any,
    };
  },
  props: {
    /**
     * The item for alarm card.
     */
    item: {
      required: true,
      type: Object as PropType<alarm>,
    },
  },
  watch: {
    /**
     * watch for change in the armed prop
     */
    "item.armed": function (newValue) {
      if (newValue) {
        this.changeButtonText("Disarm");
      } else {
        this.changeButtonText("Arm");
      }
    },
  },

  methods: {
    /**
     * method triggered on button click
     * @param {string} type type of action
     * @param {string} value value of the action
     * @public
     */
    action(item: { type: string; value: string }) {
      this.pinlength = Number(this.pin.length);

      switch (item.type) {
        //action for number button
        case "number":
          this.pin += item.value;
          break;

        //action for reset button
        case "reset":
          this.pin = "";
          break;

        //action for clear button
        case "clear":
          this.pin = this.pin.substring(0, this.pinlength - 1);
          break;

        //action for Arm/Disarm button
        case "Arm":
        case "Disarm":
          if (this.item.authentication) {
            if (!this.$refs.form) return;
            this.form = this.$refs.form;
            if (!this.form.validate()) return;
            this.pinNumber(Number(this.pin));
            this.form.resetValidation();
            this.pin = "";
          } else {
            this.pinNumber();
          }
          break;
      }
    },
    /**
     * method for triggering event
     * @param {number} value name of the event
     * @public
     */
    pinNumber(value?: number) {
      /**
       * emit event type
       * @param {object} data data for event
       * @public
       */
      this.$emit("change", {
        type: this.item.armed ? "Disarm" : "Arm",
        pin: value,
      });
    },
    /**
     * method for changing button text
     * @param {string} value name of the event
     * @public
     */
    changeButtonText(value: string) {
      this.buttonText = value;
    },
  },
});
</script>