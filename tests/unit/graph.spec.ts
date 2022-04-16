// Imports
import Graph from "@/components/graph.vue";
import { graph } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('Graph.vue', () => {
  const localVue = createLocalVue()
  let item = {
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
  }
  let wrapper: any;
  let vuetify: any;

  it('renders', () => {
    vuetify = new Vuetify();
    wrapper = mount(Graph, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('prop type', () => {
    vuetify = new Vuetify();
    wrapper = mount(Graph, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.vm.item).toMatchObject<graph>(item)
  });
})