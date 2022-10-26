<template>
  <media-player :item="item" @control="cameraControls">
    <video
      :id="item.id"
      :src="item.src"
      :type="item.type"
      autoplay
      width="100%"
    ></video>
  </media-player>
</template>
.<script lang="ts">
import Vue, { PropType } from "vue";
import { mediaItem, ControlEvent } from "../types/index.js";
import Media from "./media.vue";
/**
 * A specific video card component using Media Card component
 *  @displayName Video Card
 */
export default Vue.extend({
  name: "Video",

  data: () => ({
    video: null as any,
  }),
  props: {
    /**
     * The item for video card.
     */
    item: {
      required: true,
      type: Object as PropType<mediaItem>,
    },
  },
  components: {
    "media-player": Media,
  },
  mounted(): void {
    /**
     * getting the video element
     */
    this.video = document.getElementById(this.item.cameraId);
    if (this.video) this.video.muted = true;
  },
  methods: {
    /**
     * triggered when camera controls events from media card triggered
     * @param {ControlEvent} data type of control
     * @public
     */
    cameraControls(data: ControlEvent) {
      switch (data.type) {
        case "volume":
          if (this.video && data.value)
            if (data.value > 0) {
              this.video.muted = false;
              this.video.volume = data.value;
            }
          break;
        case "muted":
          if (this.video) this.video.muted = true;
          break;
        case "unMuted":
          if (this.video) this.video.muted = false;
          break;
        default:
          /** Event camera control buttons
           * @event cameraControls
           * @type {Event}
           */
          this.$emit("cameraControls", data);
          break;
      }
    },
  },
});
</script>