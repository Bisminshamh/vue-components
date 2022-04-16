// Imports
import VerticalStack from "@/components/verticalStack.vue";
import { vertical_card } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('VerticalStack.vue', () => {
  const localVue = createLocalVue()
  let item = {
    title: "Vertical stack",
    totalItems: 3,
  }
  let wrapper: any;
  let vuetify: any;

  it('renders', () => {
    vuetify = new Vuetify();
    wrapper = mount(VerticalStack, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('prop type', () => {
    vuetify = new Vuetify();
    wrapper = mount(VerticalStack, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.vm.item).toMatchObject<vertical_card>(item)
  });

  it('has rendered named slots', () => {
    wrapper = mount(VerticalStack, {
      slots: {
        1: '<v-btn slot="1">1</v-btn>',
        2: '<v-btn slot="1">2</v-btn>',
        3: '<v-btn slot="1">3</v-btn>'
      },
      localVue, vuetify, propsData: { item },
    })
    //find all the button component
    const button = wrapper.findAllComponents(({ name: 'v-btn' }))
    //expect the total button compoent is equal to the prop item
    expect(button.length).toBe(wrapper.vm.item.totalItems)
  })
})