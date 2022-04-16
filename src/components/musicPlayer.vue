<template>
  <v-card>
    <audio
      :src="selectedSong.src"
      style="display: none"
      ref="player"
      id="musicplayer"
    ></audio>
    <v-expand-transition>
      <v-card v-if="!list">
        <v-row>
          <v-col cols="10">
            <v-card-title class="pt-0 text-h5" v-text="selectedSong.title">
            </v-card-title>
            <v-card-subtitle v-text="selectedSong.artist"></v-card-subtitle>
          </v-col>
          <v-col cols="2" class="d-flex justify-end">
            <v-btn @click="list = true" icon class="mr-3">
              <v-icon>mdi-playlist-music-outline</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-card-text class="text-center">
          <v-btn
            class="ma-2"
            outlined
            small
            fab
            color="primary"
            :disabled="currentSong === 0"
            @click="previousSong()"
          >
            <v-icon>mdi-skip-previous</v-icon>
          </v-btn>
          <v-btn
            class="ma-2"
            outlined
            normal
            fab
            color="primary"
            @click="audioControl(!isPlaying ? 'play' : 'pause')"
          >
            <v-icon v-if="!isPlaying" large>mdi-play</v-icon>
            <v-icon v-else>mdi-pause</v-icon>
          </v-btn>

          <v-btn
            class="ma-2"
            outlined
            small
            fab
            color="primary"
            :disabled="currentSong === item.items.length - 1"
            @click="nextSong()"
          >
            <v-icon>mdi-skip-next</v-icon>
          </v-btn>
        </v-card-text>

        <v-card-actions>
          <span class="pl-2">{{ elapsedTime() }}</span>
          <v-slider
            hide-details
            v-model="playbackTime"
            min="0"
            :max="audioDuration"
            @change="updateSeek()"
          ></v-slider>
          <span class="pr-2">{{ totalTime() }}</span>
          <v-hover v-slot="{ hover }">
            <div
              class="d-flex align-center justify-end"
              :class="{ 'flex-grow-1': hover }"
            >
              <!-- slider -->
              <v-slider
                v-if="hover"
                max="1"
                step="0.1"
                hide-details
                dense
                v-model="volume"
                @input="updateVolume(volume)"
              ></v-slider>

              <!-- speaker -->
              <v-btn class="pr-3" small @click="muted = !muted" icon>
                <v-icon v-if="!muted">mdi-volume-high</v-icon>
                <v-icon v-else>mdi-volume-mute</v-icon>
              </v-btn>
            </div>
          </v-hover>
        </v-card-actions>
      </v-card>
    </v-expand-transition>
    <v-expand-transition>
      <v-card v-if="list" max-height="250" class="overflow-y-auto">
        <v-banner color="white" single-line sticky>
          Playlist

          <template v-slot:actions>
            <v-btn icon @click="list = false"><v-icon>mdi-close</v-icon></v-btn>
          </template>
        </v-banner>
        <v-list dense>
          <v-list-item-group mandatory v-model="currentSong">
            <v-list-item
              @click="changeSong(item, i)"
              v-for="(item, i) in item.items"
              :key="i"
            >
              <v-list-item-content>
                <v-list-item-title>
                  {{ `${i} . ${item.title} - ${item.artist}` }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>
<script>
</script>
<script lang="ts">
import Vue, { PropType } from "vue";
import { musicPlayer } from "../types/index";
/**
 * The Music player card for playing audio files
 * @displayName Music Player
 */
export default Vue.extend({
  name: "MusicPlayer",

  props: {
    /**
     * item for music player
     */
    item: {
      required: true,
      type: Object as PropType<musicPlayer>,
    },
  },
  data: () => ({
    audio: {} as any,
    isPlaying: false,
    wasPlaying: false,
    audioLoaded: false,
    audioDuration: 100,
    playbackTime: 0,
    listenerActive: false,
    volume: 0.5,
    selectedVolume: 0.5,
    currentSong: 0,
    menu: false,
    list: false,
    muted: false,
    selectedSong: {},
  }),
  watch: {
    /**
     * watch for isPlaying state change
     */
    isPlaying(value: boolean) {
      if (value) {
        this.initSlider();
      }
      //prevent starting multiple listeners at the same time
      if (!this.listenerActive) {
        this.listenerActive = true;
        this.audio.addEventListener("timeupdate", this.playbackListener);
      }
    },
    /**
     * watch for muted state change
     */
    muted(value: boolean) {
      if (value) this.volume = 0;
      else this.volume = this.selectedVolume;
    },
    /**
     * watch for volume change
     */
    volume(value: number) {
      if (this.audio.volume === undefined || this.audio.volume === null) return;
      this.audio.volume = value;
    },
  },

  mounted() {
    // nextTick code will run only after the entire view has been rendered
    this.$nextTick(() => {
      this.selectedSong = this.item.items[this.currentSong];
      this.audio = this.$refs.player;
      //Wait for audio to load, then run initSlider() to get audio duration

      this.audio.addEventListener("loadedmetadata", () => {
        this.initSlider();
      });
      this.isAudioLoaded();
      this.audio.addEventListener("suspend", () => {
        this.audioLoaded = false;
      });
      this.audio.addEventListener("ended", () => {
        this.endListener();
      });
    });
  },

  methods: {
    /**
     * To change song
     * @param {Object} item item for next song
     * @param {number} i index for next song
     * @public
     */
    changeSong(item: Object, i: number) {
      this.selectedSong = item;
      this.currentSong = i;
      (this.list = false), this.audioControl("play");
    },
    /**
     * method for loaded event
     * @public
     */
    isAudioLoaded() {
      // "canplay" HTML Event lets us know audio is ready for play
      this.audio.addEventListener("canplay", () => {
        this.audioLoaded = true;
        if (this.wasPlaying) this.audioControl("play");
      });
    },
    /**
     * select previous song
     * @public
     */
    previousSong() {
      console.log('object');
      if (this.currentSong != 0) {
        this.currentSong--;
        this.selectedSong = this.item.items[this.currentSong];
      }
    },
    /**
     * select next song
     * @public
     */
    nextSong() {
      if (this.currentSong < this.item.items.length - 1) {
        this.currentSong++;
        this.selectedSong = this.item.items[this.currentSong];
      }
    },
    /**
     * audio toggle
     * @param {string} name type of action
     * @public
     */
    audioControl(name: string) {
      if (this.audio === null) return;
      switch (name) {
        case "play":
          if (this.audioLoaded) {
            this.audio.play();
            this.changeWasPlaying(true);
            this.changeIsplaying(true);
          }
          break;
        case "pause":
          this.audio.pause();
          this.changeIsplaying(false);
          break;
      }
    },
    /**
     * change isPlaying state
     * @param {boolean} value status of isPlaying
     * @public
     */
    changeIsplaying(value: boolean) {
      this.isPlaying = value;
    },
    /**
     * change wasPlaying state
     * @param {boolean} value status of wasPlaying
     * @public
     */
    changeWasPlaying(value: boolean) {
      this.wasPlaying = value;
    },
    /**
     * update seek position
     * @public
     */
    updateSeek() {
      this.audio.currentTime = this.playbackTime;
    },
    /**
     * Set the range slider max value equal to audio duration
     * @public
     */
    initSlider() {
      if (this.audio === null) return;
      this.audioDuration = Math.round(this.audio.duration);
    },
    /**
     * Playback listener function runs every 100ms while audio is playing
     * @public
     */
    playbackListener() {
      //Sync local 'playbackTime' var to audio.currentTime and update global state
      this.playbackTime = this.audio.currentTime;

      //Add listeners for audio pause and audio end events
      this.audio.addEventListener("pause", this.pauseListener);
    },
    /**
     * Function to run when audio is paused by user
     * @public
     */
    pauseListener() {
      this.changeWasPlaying(true);
      this.changeIsplaying(false);
      this.listenerActive = false;
      this.cleanupListeners();
    },
    /**
     * Function to run when audio play reaches the end of file
     * @public
     */
    endListener() {
      if (this.item.items.length > this.currentSong + 1) this.nextSong();
      else this.changeWasPlaying(false);
      this.changeIsplaying(false);
      this.listenerActive = false;
      this.cleanupListeners();
    },
    /**
     * Remove listeners after audio play stops
     * @public
     */
    cleanupListeners() {
      this.audio.removeEventListener("timeupdate", this.playbackListener);
      this.audio.removeEventListener("ended", this.endListener);
      this.audio.removeEventListener("pause", this.pauseListener);
    },
    /**
     * Convert audio current time from seconds to min:sec display
     * @public
     * @param {number} seconds time in seconds
     *
     */
    convertTime(seconds: number) {
      const format = (val: number) => `0${Math.floor(val)}`.slice(-2);
      // var hours = seconds / 3600;
      var minutes = (seconds % 3600) / 60;
      return [minutes, seconds % 60].map(format).join(":");
    },
    /**
     * Show the total duration of audio file
     * @public
     */
    totalTime() {
      if (this.audio.duration) {
        var seconds = this.audio.duration;
        return this.convertTime(seconds);
      } else {
        return "00:00";
      }
    },
    /**
     * Display the audio time elapsed so far
     * @public
     */
    elapsedTime() {
      if (this.audio) {
        var seconds = this.audio.currentTime;
        return this.convertTime(seconds);
      } else {
        return "00:00";
      }
    },
    /**
     * update volume
     * @public
     */
    updateVolume(value: number) {
      this.selectedVolume = value;
    },
  },
});
</script>