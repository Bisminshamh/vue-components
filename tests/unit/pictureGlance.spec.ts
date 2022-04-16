// Imports
import PictureGlance from "@/components/pictureGlance.vue";
import { pictureGlance } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('PictureGlance.vue', () => {
  const localVue = createLocalVue()
  let item = {
    title: "Picture Glance",
    items: [
      {
        id: "Room",
        status: true,
        icon: {
          on: "mdi-lightbulb",
          off: "mdi-lightbulb-off",
        },
        iconColor: {
          on: "red",
          off: "yellow",
        },
      },
      {
        id: "1",
        status: false,
        icon: {
          on: "mdi-lightbulb",
          off: "mdi-lightbulb-off",
        },
        iconColor: {
          on: "red",
          off: "yellow",
        },
      },
    ],
  }
  let wrapper: any;
  let vuetify: any;

  it('renders', () => {
    vuetify = new Vuetify();
    wrapper = mount(PictureGlance, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('prop type', () => {
    vuetify = new Vuetify();
    wrapper = mount(PictureGlance, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.vm.item).toMatchObject<pictureGlance>(item)
  });
  let cases = [
    {
      index: 0,
      item: {
        id: "Room",
        status: true,
        icon: {
          on: "mdi-lightbulb",
          off: "mdi-lightbulb-off",
        },
        iconColor: {
          on: "red",
          off: "yellow",
        },
      }
    },
    {
      index: 1,
      item: {
        id: "1",
        status: false,
        icon: {
          on: "mdi-lightbulb",
          off: "mdi-lightbulb-off",
        },
        iconColor: {
          on: "red",
          off: "yellow",
        },
      }
    },
  ]
  it.each(cases)('icons are rendered and click on button trigger expected method and emitted expected event',
    async (options) => {
      vuetify = new Vuetify();
      wrapper = mount(PictureGlance, {
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
      expect(icon.classes()).toContain(options.item.status ? options.item.icon.on : options.item.icon.off)
      //icon color
      expect(icon.classes()).toContain(options.item.status ? `${options.item.iconColor.on}--text` : `${options.item.iconColor.off}--text`)

    })

})