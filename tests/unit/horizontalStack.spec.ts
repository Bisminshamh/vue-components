// Imports
import HorizontalStack from "@/components/horizontalStack.vue";
import { horizontal_card } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('HorizontalStack.vue', () => {
  const localVue = createLocalVue()
  let item = {
    title: "Horizontal stack",
    totalItems: 3,
  }
  let wrapper: any;
  let vuetify: any;

  it('renders', () => {
    vuetify = new Vuetify();
    wrapper = mount(HorizontalStack, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('prop type', () => {
    vuetify = new Vuetify();
    wrapper = mount(HorizontalStack, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.vm.item).toMatchObject<horizontal_card>(item)
  });

  it('has rendered named slots', () => {
    wrapper = mount(HorizontalStack, {
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
  let colCases: Array<[number, string, number]> = [
    //index,totalItems,expectedColClass
    [1, "col-12", 0],
    [2, "col-6", 0],
    [3, "col-4", 0],
    [4, "col-3", 0],
    [5, "col-2", 0],
    [6, "col-2", 0],
    [0, "", 0]
  ]
  it.each(colCases)('when total slots is `%p` cols class contains `%s`',
    async (totalItems, expectedColClass, index) => {
      vuetify = new Vuetify();
      wrapper = mount(HorizontalStack, {
        localVue, vuetify, propsData: { item },
      })
      await wrapper.setProps(item.totalItems = totalItems)
      const cols = wrapper.findAllComponents(({ name: 'v-col' }))
      let colsAt;
      if (totalItems === 0)
        expect(cols.length).toBe(0)
      else {
        colsAt = cols.at(index)
        expect(colsAt.classes()).toContain(expectedColClass)
      }
    })
})