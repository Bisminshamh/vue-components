import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils';
import Glance from "@/components/glance.vue"
import { glance } from "@/types/index";
import "./setup"
describe('Glance.vue', () => {
  const localVue = createLocalVue()
  let item = {
    name: "Glance",
    items: [
      {
        name: "Movement",
        status: false,
        Options: {
          icon: {
            on: "mdi-run",
            off: "mdi-run",
          },
          icon_color: {
            on: "yellow",
            off: "grey",
          },
        },
      },
    ],
  }
  let wrapper: any;
  let vuetify: any;

  it('renders', () => {
    vuetify = new Vuetify();
    wrapper = mount(Glance, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.exists()).toBe(true)
  })
  it('prop type', () => {
    vuetify = new Vuetify();
    wrapper = mount(Glance, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.vm.item).toMatchObject<glance>(item)
  });
  const iconCases = [
    //status,expectedIcon,expectedIconColor
    [true, 'mdi-run', "yellow--text"],
    [false, 'mdi-shield-check', "grey--text"],
  ]
  it.each(iconCases)('status:%s, expectedIcon:%s, expectedIconColor:%s',
    async (status, expectedIcon, expectedIconColor) => {
      vuetify = new Vuetify();
      wrapper = mount(Glance, {
        localVue, vuetify, propsData: {
          item: {

            name: "Glance",
            items: [
              {
                name: "Movement",
                status: status,
                Options: {
                  icon: {
                    on: "mdi-run",
                    off: "mdi-shield-check",
                  },
                  icon_color: {
                    on: "yellow",
                    off: "grey",
                  },
                },
              },
            ],
          }
        },
      })
      const icon = wrapper.findAllComponents(({ name: 'v-icon' })).at(0)
      //icon check
      expect(icon.classes()).toContain(expectedIcon)
      //icon color check
      expect(icon.classes()).toContain(expectedIconColor)
    });
})