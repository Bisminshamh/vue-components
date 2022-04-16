// Imports
import Webpage from "@/components/webpage.vue";
import { webpage } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('Webpage.vue', () => {
  const localVue = createLocalVue()
  let item = {
    title: "Webpage",
    src: "https://vuetifyjs.com/en/",
    height: "500",
  }
  let wrapper: any;
  let vuetify: any;

  it('renders', () => {
    vuetify = new Vuetify();
    wrapper = mount(Webpage, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('prop type', () => {
    vuetify = new Vuetify();
    wrapper = mount(Webpage, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.vm.item).toMatchObject<webpage>(item)
  });
})