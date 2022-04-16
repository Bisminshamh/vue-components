// Imports
import PictureElement from "@/components/pictureElement.vue";
import { pictureElement } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('PictureElement.vue', () => {
  const localVue = createLocalVue()
  let item = {
    title: "Picture Element",
    src: "",
    icons: [
      {
        id: "room 1",
        status: false,
        on: "mdi-lightbulb-on",
        off: "mdi-lightbulb-off",
        color: {
          on: "yellow",
          off: "grey",
        },
        position: {
          top: 30,
          left: 50,
          rotate: 0,
        },
      },
      {
        id: "room 2",
        status: true,
        on: "mdi-lightbulb-on",
        off: "mdi-lightbulb-off",
        color: {
          on: "yellow",
          off: "grey",
        },
        position: {
          top: 40,
          left: 7,
          rotate: 0,
        },
      },
    ],
  }
  let wrapper: any;
  let vuetify: any;

  it('renders', () => {
    vuetify = new Vuetify();
    wrapper = mount(PictureElement, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('prop type', () => {
    vuetify = new Vuetify();
    wrapper = mount(PictureElement, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.vm.item).toMatchObject<pictureElement>(item)
  });
  let cases = [
    {
      index: 0,
      item: {
        id: "room 1",
        status: false,
        on: "mdi-lightbulb-on",
        off: "mdi-lightbulb-off",
        color: {
          on: "yellow",
          off: "grey",
        },
        position: {
          top: 30,
          left: 50,
          rotate: 0,
        },
      }
    },
    {
      index: 1,
      item: {
        id: "room 2",
        status: true,
        on: "mdi-lightbulb-on",
        off: "mdi-lightbulb-off",
        color: {
          on: "yellow",
          off: "grey",
        },
        position: {
          top: 40,
          left: 7,
          rotate: 0,
        },
      }
    },
  ]
  it.each(cases)('icons are rendered and click on button trigger expected method and emitted expected event',
    async (options) => {
      vuetify = new Vuetify();
      wrapper = mount(PictureElement, {
        localVue, vuetify, propsData: { item },
      })

      //spy the methods
      const emitMethod = jest.spyOn(wrapper.vm, 'clicked')
      const event = jest.fn()
      const button = wrapper.findAllComponents(({ name: 'v-btn' })).at(options.index)
      const icon = wrapper.findAllComponents(({ name: 'v-icon' })).at(options.index)

      // Here we bind a listener to the wrapper
      // instance to catch our custom event
      wrapper.vm.$on('clicked', event)
      // Simulate a click on the button
      await button.trigger('click')

      //check whether methods called
      expect(emitMethod).toHaveBeenCalledWith(options.item)
      //check the emited event 
      expect(event).toHaveBeenCalledWith({ id: options.item.id, status: !options.item.status })
      //icons
      expect(icon.classes()).toContain(options.item.status ? options.item.on : options.item.off)
      //icon color
      expect(icon.classes()).toContain(options.item.status ? `${options.item.color.on}--text` : `${options.item.color.off}--text`)

    })
})