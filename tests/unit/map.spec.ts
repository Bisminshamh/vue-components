// Imports
import Map from "@/components/map.vue";
import { map } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('Map.vue', () => {
  const localVue = createLocalVue()
  let item = {
    title: "Map",
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
  }
  let wrapper: any;
  let vuetify: any;

  it('renders', () => {
    vuetify = new Vuetify();
    wrapper = mount(Map, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('prop type', () => {
    jest.mock('leaflet')
    vuetify = new Vuetify();
    wrapper = mount(Map, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.vm.item).toMatchObject<map>(item)
  });
})