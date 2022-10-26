<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row justify="center" class="ma-12">
          <v-col lg="4" sm="6" md="6" cols="12" xl="4">
            <v-select
              :items="items"
              label="Select a component"
              @change="selectedComponent = $event"
              outlined
              v-model="selectedComponent"
            ></v-select>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col
            v-if="selectedComponent === 'MediaCard'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Media
              :item="media"
              @control="controlEvent"
              :cardStyle="radialBarItem.cardStyle"
              :options="media.options"
            >
              <v-img :id="media.id" :src="media.src"></v-img>
            </Media>
          </v-col>
          <v-col
            v-else-if="selectedComponent === 'VideoCard'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
            class="d-flex"
          >
            <Video :item="video" @cameraControls="controlEvent"> </Video>
          </v-col>
          <v-col
            v-if="selectedComponent === 'Alarm'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Alarm :item="alarmItem" @change="pin" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Button'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Button :item="button" @change="change" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Slider'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Slider
              :item="slider"
              @range="changeSlider('range', $event)"
              @change="changeSlider('slider', $event)"
            />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Entity'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Entity :item="entity" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Entity2'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Entity2
              :item="entity2"
              :cardStyle="entity2.cardStyle"
              :isSwitchable="item.isSwitchable"
            />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Toggle'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Toggle :item="toggle" :cardStyle="toggle.cardStyle" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Analog'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Analog :item="analog" :cardStyle="analog.cardStyle" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Digital'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Digital :item="digital" :cardStyle="digital.cardStyle" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Accel'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Accel :item="accel" :cardStyle="accel.cardStyle" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Entities'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Entities :item="entities" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Glance'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Glance :item="glance" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Logbook'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Logbook :item="logbook" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Markdown'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Markdown :item="markdown" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'MusicPlayer'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <MusicPlayer :item="musicPlayer" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Webpage'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Webpage :item="webpage" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Todo'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Todo :item="todo" @change="completedTodo" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Graph'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Graph :item="GraphItem" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Audio'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
            class="d-flex"
          >
            <Audio
              @buttonEvent="dial"
              :item="audioItem"
              :callConnected="callConnected"
            />
          </v-col>
          <v-col
            v-if="selectedComponent === 'HorizontalStack'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <HorizontalStack :item="HorizontalStack">
              <v-btn slot="1" elevation="2">1</v-btn>
              <v-btn slot="2" elevation="2">2</v-btn>
              <v-btn slot="3" elevation="2">3</v-btn>
            </HorizontalStack>
          </v-col>
          <v-col
            v-if="selectedComponent === 'Gauge'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Gauge :item="gaugeItem" :cardStyle="gaugeItem.cardStyle" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'RadialBar'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <RadialBar
              :item="radialBarItem"
              :cardStyle="radialBarItem.cardStyle"
            />
          </v-col>
          <v-col
            v-if="selectedComponent === 'HistoryGraph'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <HistoryGraph :item="HistoryGraphItem" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Map'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Map :item="MapItem">
              <template scope="{item}">
                <div>
                  <strong>Device Id:</strong> {{ item.id }}
                  <hr />
                  <strong>latitude:</strong> {{ item.lat }}<br />
                  <strong>longitude:</strong> {{ item.long }}
                </div>
              </template>
            </Map>
          </v-col>
          <v-col
            v-if="selectedComponent === 'PictureElement'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <PictureElement @clicked="iconClicked" :item="pictureElement" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'Sensor'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Sensor :item="sensorItem" />
          </v-col>
          <v-col
            v-if="selectedComponent === 'VerticalStack'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <VerticalStack :item="VerticalStack">
              <v-btn slot="1" elevation="2">1</v-btn>
              <v-btn slot="2" elevation="2">2</v-btn>
              <v-btn slot="3" elevation="2">3</v-btn>
              <v-btn slot="4" elevation="2">4</v-btn>
            </VerticalStack>
          </v-col>
          <v-col
            v-if="selectedComponent === 'PictureGlance'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <PictureGlance :item="pictureGlance" @clicked="iconChange">
              <v-img :src="pictureGlance.src"></v-img>
            </PictureGlance>
          </v-col>
          <v-col
            v-if="selectedComponent === 'Conditional'"
            lg="4"
            sm="6"
            md="6"
            cols="12"
            xl="4"
          >
            <Conditional :item="item" @events="handleMyEvent">
              <v-img :src="item.item.src"></v-img>
            </Conditional>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>
<script lang="ts">
import Vue from "vue";
import {
  mediaItem,
  alarm,
  button,
  slider,
  entity,
  entities,
  glance,
  logbook,
  markdown,
  musicPlayer,
  webpage,
  todo,
  graph,
  audioItem,
  horizontal_card,
  gauge,
  history_graph,
  map,
  pictureElement,
  pictureElementIconItem,
  sensor,
  vertical_card,
  pictureGlance,
  pictureGlanceItem,
  conditional,
} from "./types";
import Media from "./components/media.vue";
import Video from "./components/video.vue";
import Alarm from "./components/alarm.vue";
import Button from "./components/button.vue";
import Slider from "./components/slider.vue";
import Entity from "./components/entity.vue";
import Entity2 from "./components/entity2.vue";
import Entities from "./components/entities.vue";
import Glance from "./components/glance.vue";
import Logbook from "./components/logbook.vue";
import Markdown from "./components/markdown.vue";
import MusicPlayer from "./components/musicPlayer.vue";
import Webpage from "./components/webpage.vue";
import Todo from "./components/todo.vue";
import Graph from "./components/graph.vue";
import Audio from "./components/audio.vue";
import HorizontalStack from "@/components/horizontalStack.vue";
import Gauge from "./components/gauge.vue";
import RadialBar from "./components/radialBar.vue";
import HistoryGraph from "@/components/historyGraph.vue";
import Map from "./components/map.vue";
import PictureElement from "@/components/pictureElement.vue";
import Sensor from "./components/sensor.vue";
import VerticalStack from "@/components/verticalStack.vue";
import PictureGlance from "./components/pictureGlance.vue";
import Conditional from "./components/conditional.vue";
import Toggle from "./components/toggle.vue";
import Analog from "./components/analog.vue";
import Digital from "./components/digital.vue";
import Accel from "./components/accelerometer.vue";

export default Vue.extend({
  name: "App",

  components: {
    Media,
    Video,
    Alarm,
    Button,
    Slider,
    Entity,
    Entity2,
    Entities,
    Glance,
    Logbook,
    Markdown,
    MusicPlayer,
    Webpage,
    Todo,
    Graph,
    Audio,
    HorizontalStack,
    Gauge,
    HistoryGraph,
    Map,
    PictureElement,
    Sensor,
    VerticalStack,
    PictureGlance,
    Conditional,
    RadialBar,
    Toggle,
    Analog,
    Digital,
    Accel,
  },

  data: () => ({
    items: [
      "MediaCard",
      "VideoCard",
      "Alarm",
      "Button",
      "Slider",
      "Entity",
      "Entity2",
      "Entities",
      "Glance",
      "Logbook",
      "Markdown",
      "MusicPlayer",
      "Webpage",
      "Todo",
      "Graph",
      "Audio",
      "HorizontalStack",
      "Gauge",
      "HistoryGraph",
      "Map",
      "PictureElement",
      "Sensor",
      "VerticalStack",
      "PictureGlance",
      "Conditional",
      "RadialBar",
      "Toggle",
      "Analog",
      "Digital",
      "Accel",
    ],
    selectedComponent: "Gauge",
    media: {
      cameraId: "1",
      src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      friendlyName: "camera 1",
      options: {
        PT: true,
        zoom: true,
        mic: true,
        volume: true,
      },
      cardStyle: {
        outlined: true,
        rounded: "lg",
      },
    },
    video: {
      cameraId: "2",
      type: "video/mp4",
      src: "https://download.blender.org/peach/bigbuckbunny_movies/big_buck_bunny_720p_stereo.ogg",
      friendlyName: "camera 2",
      options: {
        PT: true,
        zoom: false,
        mic: false,
        volume: true,
      },
      cardStyle: {
        outlined: true,
        rounded: "lg",
      },
    },
    alarmItem: {
      title: "Alarm",
      armed: false,
      authentication: true,
    } as alarm,
    button: {
      name: "Kitchen Door",
      status: false,
      Options: {
        icon: {
          show: true,
          on: {
            name: "mdi-lock",
            color: "green",
          },
          off: {
            name: "mdi-lock-open",
            color: "red",
          },
          size: 80,
        },
        style: {
          v_card: {
            outlined: true,
            rounded: "lg",
          },
        },
      },
    } as button,
    slider: {
      name: "Kitchen Light",
      status: true,
      range: 50,
      Options: {
        icon: {
          show: true,
          on: {
            name: "mdi-lightbulb-on",
            color: "yellow",
          },
          off: {
            name: "mdi-lightbulb",
            color: "grey",
          },
          size: 80,
        },
        style: {
          v_card: {
            outlined: true,
            rounded: "lg",
          },
        },
      },
    } as slider,
    entity: {
      title: "Entity Name",
      value: 0.966,
      unit: " %",
      options: {
        icon: true,
      },
    } as entity,
    entity2: {
      friendlyName: "Ups O/p Current",
      value: true,
      roundTo: 2,
      isSwitchable: true,
      icon: {
        true: "mdi-current-ac",
        false: "mdi-current-ac",
      },
      text: {
        true: "On",
        false: "Off",
      },
      cardStyle: {
        outlined: true,
        rounded: "lg",
      },
    },
    toggle: {
      friendlyName: "Light",
      value: true,
      roundTo: 2,
      isSwitchable: true,
      icon: {
        true: "mdi-current-ac",
        false: "mdi-current-ac",
      },
      text: {
        true: "On",
        false: "Off",
      },
      style: {
        v_card: {
          outlined: true,
          rounded: "lg",
        },
      },
    },
    analog: {
      friendlyName: "O/p Current",
      value: 1.23655,
      roundTo: 2,
      unit: "A",
      cardStyle: {
        outlined: true,
        rounded: "lg",
      },
    },

    digital: {
      friendlyName: "O/p Current",
      value: 1.23655,
      roundTo: 2,
      unit: "A",
      cardStyle: {
        outlined: true,
        rounded: "lg",
      },
      icon: {
        true: "mdi-current-ac",
        false: "mdi-current-ac",
      },
      text: {
        true: "On",
        false: "Off",
      },
    },
    accel: {
      friendlyName: "Accelerometer",
      value: [1.23655, 3.22, 5.55],
      roundTo: 3,
      cardStyle: {
        outlined: true,
        rounded: "lg",
      },
      icon: "mdi-axis-arrow",
    },
    entities: {
      title: "Name",
      options: {
        style: {
          v_card: {
            outlined: true,
            rounded: "lg",
          },
        },
      },
      items: [
        {
          title: "Real-Time",
          value: true,
          options: {
            isSwitchable: true,
            icon: {
              on: {
                name: "mdi-clock",
                color: "yellow",
              },
              off: {
                name: "mdi-account",
                color: "red",
              },
            },
          },
        },
        {
          title: "Audience",
          value: 120,
          unit: "V",
          options: {
            isSwitchable: false,
            condition: "<",
            conditionValue: 5,
            icon: {
              on: {
                name: "mdi-clock",
                color: "yellow",
              },
              off: {
                name: "mdi-account",
                color: "red",
              },
            },
          },
        },
        {
          title: "Conversions",
          value: true,
          options: {
            isSwitchable: true,
            icon: {
              on: {
                name: "mdi-flag",
                color: "blue",
              },
              off: {
                name: "mdi-flag",
                color: "red",
              },
            },
          },
        },
      ],
    } as entities,
    glance: {
      name: "Glance",
      items: [
        {
          name: "Movement",
          status: false,
          Options: {
            icon: {
              on: {
                name: "mdi-clock",
                color: "yellow",
              },
              off: {
                name: "mdi-account",
                color: "red",
              },
            },
          },
        },
        {
          name: "Bed Light",
          status: true,

          Options: {
            icon: {
              on: {
                name: "mdi-clock",
                color: "yellow",
              },
              off: {
                name: "mdi-account",
                color: "red",
              },
            },
          },
        },
        {
          name: "Room Temperature",
          status: true,

          Options: {
            icon: {
              on: {
                name: "mdi-clock",
                color: "yellow",
              },
              off: {
                name: "mdi-account",
                color: "red",
              },
            },
          },
        },
        {
          name: "air-conditioner",
          status: true,

          Options: {
            icon: {
              on: {
                name: "mdi-clock",
                color: "yellow",
              },
              off: {
                name: "mdi-account",
                color: "red",
              },
            },
          },
        },
        {
          name: "Ceiling",
          status: true,

          Options: {
            icon: {
              on: {
                name: "mdi-clock",
                color: "yellow",
              },
              off: {
                name: "mdi-account",
                color: "red",
              },
            },
          },
        },
      ],
    } as glance,
    logbook: {
      name: "Logbook",
      Date: "October 30, 2020",
      items: [
        {
          icon: "mdi-lightbulb",
          status: true,
          title: "Ceiling Light",
          Date: "5:39:36 PM - 14 seconds ago",
        },
        {
          icon: "mdi-lightbulb",
          status: false,
          title: "Fan",
          Date: "5:39:36 PM - 14 seconds ago",
        },
        {
          icon: "mdi-lightbulb",
          status: false,

          title: "Ac",
          Date: "5:39:36 PM - 14 seconds ago",
        },
        {
          icon: "mdi-lightbulb",
          status: false,
          title: "Ac",
          Date: "5:39:36 PM - 14 seconds ago",
        },
        {
          icon: "mdi-lightbulb",
          status: false,
          title: "Ac",
          Date: "5:39:36 PM - 14 seconds ago",
        },
      ],
    } as logbook,
    markdown: {
      title: "Markdown",
      content:
        "The **Markdown** card allows you to write any text. You can style it **bold**, *italicized*, ~strikethrough~ etc. You can do images, links, and more.",
    } as markdown,
    musicPlayer: {
      items: [
        {
          title: "Service Bell",
          artist: "Daniel Simion",
          src: "https://soundbible.com/mp3/service-bell_daniel_simion.mp3",
        },
        {
          title: "Meadowlark",
          artist: "Daniel Simion",
          src: "https://soundbible.com/mp3/meadowlark_daniel-simion.mp3",
        },
      ],
    } as musicPlayer,
    webpage: {
      title: "Webpage",
      src: "https://vuetifyjs.com/en/",
      height: "500",
    } as webpage,
    todo: {
      name: "TODO",
      items: [
        {
          id: 1,
          title: "Go workout",
          status: false,
        },
        {
          id: 2,
          title: "Do laundry",
          status: false,
        },
        {
          id: 3,
          title: "Cook food",
          status: false,
        },
        {
          id: 4,
          title: "Clean up room",
          status: true,
        },
        {
          id: 5,
          title: "Finish work",
          status: false,
        },
      ],
    } as todo,
    GraphItem: {
      title: "Graph",
      options: {
        chart: {
          type: "line",
        },
        fill: {
          type: "solid",
          colors: undefined,
        },
        xaxis: {
          type: "datetime",
          categories: [
            "2019-01-01",
            "2019-02-01",
            "2019-03-01",
            "2019-04-01",
            "2019-05-01",
            "2019-06-01",
            "2019-07-01",
          ],
        },
      },
      data: [
        {
          name: "A",
          data: [15, 20, 21, 25, 60, 120, 93],
        },
        {
          name: "B",
          data: [93, 120, 60, 25, 60, 21, 20],
        },
      ],
    } as graph,
    audioItem: {
      title: "Audio",
    } as audioItem,
    callConnected: false,
    HorizontalStack: {
      title: "Horizontal stack",
      totalItems: 3,
    } as horizontal_card,
    gaugeItem: {
      value: 76,
      unit: "C",
      friendlyName: "Temperature",
      cardStyle: {
        outlined: true,
        rounded: "lg",
      },
    },
    radialBarItem: {
      value: 76.33,
      unit: "°C",
      roundTo: 2,
      friendlyName: "Temperature",
      cardStyle: {
        outlined: true,
        rounded: "lg",
      },
    },
    HistoryGraphItem: {
      title: "HistoryGraph",
      data: [
        {
          name: "on",
          data: [
            {
              x: "Door Sensor",
              y: [
                new Date(1789, 3, 30).getTime(),
                new Date(1797, 2, 4).getTime(),
              ],
            },
          ],
        },
        {
          name: "off",
          data: [
            {
              x: "Door Sensor",
              y: [
                new Date(1797, 2, 4).getTime(),
                new Date(1801, 2, 4).getTime(),
              ],
            },
          ],
        },
      ],
    } as history_graph,
    MapItem: {
      title: "Map",
      options: {
        header: false,
        height: "50vh",
        style: {
          v_card: {
            outlined: true,
            rounded: "lg",
          },
        },
      },
      items: [
        {
          id: "1",
          lat: "2.22",
          long: "5.22",
        },
        {
          id: "2",
          lat: "2.23",
          long: "5.24",
        },
      ],
    } as map,
    pictureElement: {
      title: "Picture Element",
      src: "https://demo.home-assistant.io/assets/arsaboo/floorplans/main.png",
      icons: [
        {
          on: {
            name: "mdi-lightbulb-on",
            color: "yellow",
          },
          off: {
            name: "mdi-lightbulb-off",
            color: "grey",
          },
          id: "room 1",
          status: false,
          position: {
            top: 30,
            left: 50,
            rotate: 0,
          },
        },
        {
          id: "room 2",
          status: true,
          on: {
            name: "mdi-lightbulb-on",
            color: "yellow",
          },
          off: {
            name: "mdi-lightbulb-off",
            color: "grey",
          },
          position: {
            top: 40,
            left: 7,
            rotate: 0,
          },
        },
        {
          id: "room 3",
          status: false,
          on: {
            name: "mdi-lightbulb-on",
            color: "yellow",
          },
          off: {
            name: "mdi-lightbulb-off",
            color: "grey",
          },
          position: {
            top: 90,
            left: 15,
            rotate: 0,
          },
        },
        {
          id: "door 1",
          status: false,
          on: {
            name: "mdi-door-closed",
            color: "yellow",
          },
          off: {
            name: "mdi-door-closed",
            color: "grey",
          },
          position: {
            top: 84,
            left: 27,
            rotate: 0,
          },
        },
        {
          id: "door 2",
          status: false,
          on: {
            name: "mdi-door-closed",
            color: "yellow",
          },
          off: {
            name: "mdi-door-closed",
            color: "grey",
          },
          position: {
            top: 12,
            left: 10,
            rotate: 0,
          },
        },
        {
          id: "motion 1",
          on: {
            name: "mdi-walk",
            color: "yellow",
          },
          off: {
            name: "mdi-walk",
            color: "grey",
          },
          position: {
            top: 23,
            left: 50,
            rotate: 0,
          },
        },
        {
          id: "motion 2",
          on: {
            name: "mdi-walk",
            color: "yellow",
          },
          off: {
            name: "mdi-walk",
            color: "grey",
          },
          position: {
            top: 23,
            left: 80,
            rotate: 0,
          },
        },
        {
          id: "motion 3",
          on: {
            name: "mdi-walk",
            color: "yellow",
          },
          off: {
            name: "mdi-walk",
            color: "grey",
          },
          position: {
            top: 90,
            left: 27,
            rotate: 0,
          },
        },
        {
          id: "video 1",
          on: {
            name: "mdi-video",
            color: "yellow",
          },
          off: {
            name: "mdi-account",
            color: "grey",
          },
          position: {
            top: 11,
            left: 1,
            rotate: -45,
          },
        },
        {
          id: "video 2",
          on: {
            name: "mdi-video",
            color: "yellow",
          },
          off: {
            name: "mdi-video",
            color: "grey",
          },
          position: {
            top: 11,
            left: 90,
            rotate: -135,
          },
        },
        {
          id: "video 3",
          on: {
            name: "mdi-video",
            color: "yellow",
          },
          off: {
            name: "mdi-video",
            color: "grey",
          },
          position: {
            top: 80,
            left: 90,
            rotate: 135,
          },
        },
        {
          id: "video 4",
          on: {
            name: "mdi-video",
            color: "yellow",
          },
          off: {
            name: "mdi-video",
            color: "grey",
          },
          position: {
            top: 89,
            left: 3,
            rotate: 45,
          },
        },
        {
          id: "light 1",
          on: {
            name: "mdi-ceiling-light-outline",
            color: "yellow",
          },
          off: {
            name: "mdi-ceiling-light-outline",
            color: "grey",
          },
          position: {
            top: 80,
            left: 75,
            rotate: 0,
          },
        },
      ],
    } as pictureElement,
    sensorItem: {
      entity: {
        title: "Entity Name",
        value: 0.966,
        unit: " %",
        options: {
          icon: true,
        },
      },
      graph: {
        categories: [
          "2019-01-01",
          "2019-02-01",
          "2019-03-01",
          "2019-04-01",
          "2019-05-01",
          "2019-06-01",
          "2019-07-01",
          "2019-08-01",
          "2019-09-01",
        ],
        series: [
          {
            name: "Entity Name",
            data: [15, 20, 21, 25, 60, 150, 93, 77, 85],
          },
        ],
      },
    } as sensor,
    VerticalStack: {
      title: "Vertical stack",
      totalItems: 4,
    } as vertical_card,
    pictureGlance: {
      src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
      title: "Picture Glance",
      items: [
        {
          id: "Room",
          status: true,
          Options: {
            icon: {
              on: {
                name: "mdi-lightbulb",
                color: "red",
              },
              off: {
                name: "mdi-lightbulb-off",
                color: "yellow",
              },
            },
          },
        },
        {
          id: "1",
          status: false,
          Options: {
            icon: {
              on: {
                name: "mdi-lightbulb",
                color: "red",
              },
              off: {
                name: "mdi-lightbulb-off",
                color: "yellow",
              },
            },
          },
        },
      ],
    } as pictureGlance,
    item: {
      type: "pictureGlance",
      condition: [true, true, true],
      item: {
        src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        title: "Picture Glance",
        items: [
          {
            id: "Room",
            status: true,
            Options: {
              icon: {
                on: {
                  name: "mdi-lightbulb",
                  color: "red",
                },
                off: {
                  name: "mdi-lightbulb-off",
                  color: "yellow",
                },
              },
            },
          },
          {
            id: "1",
            status: false,
            Options: {
              icon: {
                on: {
                  name: "mdi-lightbulb",
                  color: "red",
                },
                off: {
                  name: "mdi-lightbulb-off",
                  color: "yellow",
                },
              },
            },
          },
        ],
      },
    } as conditional,
  }),

  methods: {
    controlEvent(v: string): void {
      console.log(v);
    },
    pin(v: { type: string; pin: number }) {
      if (v.type === "Arm") this.alarmItem.armed = true;
      else if (v.type === "Disarm") this.alarmItem.armed = false;
    },
    change(value: boolean): void {
      this.button.status = value;
    },
    changeSlider(name: string, value: any): void {
      switch (name) {
        case "range":
          this.slider.range = Number(value);
          break;

        case "slider":
          this.slider.status = Boolean(value);
          break;
      }
    },
    completedTodo(data: { type: string; id: number; title: string }) {
      switch (data.type) {
        case "completed":
        case "incompleted":
          this.todo.items.forEach((item) => {
            if (item.id === data.id) item.status = !item.status;
          });
          break;
        case "addTodo":
          this.todo.items.push({
            id: this.todo.items.length + 1,
            title: data.title,
            status: false,
          });
          break;
        case "clear":
          this.todo.items = this.todo.items.filter((item) => !item.status);
      }
    },
    dial(v: { type: string }) {
      console.log(v);
      switch (v.type) {
        case "call-connect":
          this.callConnected = true;
          break;

        case "call-disconnect":
          this.callConnected = false;
          break;
      }
    },
    iconClicked(v: { id: string; status: boolean }) {
      this.pictureElement.icons.forEach((icon: pictureElementIconItem) => {
        if (icon.id === v.id) icon.status = v.status;
      });
    },
    iconChange(v: { id: string; status: boolean }) {
      this.pictureGlance.items.forEach((item: pictureGlanceItem) => {
        if (item.id === v.id) item.status = v.status;
      });
    },
    handleMyEvent(v: any) {
      console.log(v);
    },
  },
});
</script>