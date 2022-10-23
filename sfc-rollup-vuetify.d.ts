import Vue, { PluginFunction, VueConstructor } from 'vue';


interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const SfcRollupVuetify: { install: InstallFunction };
export default SfcRollupVuetify;

export const MediaPlayer: VueConstructor<Vue>;
export const VideoPlayer: VueConstructor<Vue>;
export const Alarm: VueConstructor<Vue>;
export const Button: VueConstructor<Vue>;
export const Slider: VueConstructor<Vue>;
export const Entity: VueConstructor<Vue>;
export const Entity2: VueConstructor<Vue>;
export const Entities: VueConstructor<Vue>;
export const Glance: VueConstructor<Vue>;
export const Logbook: VueConstructor<Vue>;
export const Markdown: VueConstructor<Vue>;
export const musicPlayer: VueConstructor<Vue>;
export const Webpage: VueConstructor<Vue>;
export const Todo: VueConstructor<Vue>;
export const Graph: VueConstructor<Vue>;
export const Audio: VueConstructor<Vue>;
export const HorizontalStack: VueConstructor<Vue>;
export const Gauge: VueConstructor<Vue>;
export const HistoryGraph: VueConstructor<Vue>;
export const Map: VueConstructor<Vue>;
export const PictureElement: VueConstructor<Vue>;
export const Sensor: VueConstructor<Vue>;
export const VerticalStack: VueConstructor<Vue>;
export const PictureGlance: VueConstructor<Vue>;
export const Conditional: VueConstructor<Vue>;
export const RadialBar: VueConstructor<Vue>;
export const Analog: VueConstructor<Vue>;
export const Digital: VueConstructor<Vue>;
export const Toggle: VueConstructor<Vue>;
export const Accelerometer: VueConstructor<Vue>;
