// Imports
import Gauge from "@/components/gauge.vue";
import { gauge } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('Gauge.vue', () => {
  const localVue = createLocalVue()
  let item = {
    title: "Gauge",
    value: 76,
    unit: "C",
    name: "Temperature",
  }
  let wrapper: any;
  let vuetify: any;

  it('renders', () => {
    vuetify = new Vuetify();
    wrapper = mount(Gauge, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('prop type', () => {
    vuetify = new Vuetify();
    wrapper = mount(Gauge, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.vm.item).toMatchObject<gauge>(item)
  });
})