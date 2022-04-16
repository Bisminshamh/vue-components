import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils';
import Entities from "@/components/entities.vue"
import { entities } from "@/types/index";
import "./setup"

describe('Entity.vue', () => {
    const localVue = createLocalVue()
    const item = {
        title: "Name",
        items: [
            {
                title: "Real-Time",
                value: true,
                options: {
                    isSwitchable: true,
                    icon: {
                        on: "mdi-clock",
                        off: "mdi-account",
                    },
                    icon_color: {
                        on: "blue",
                        off: "red",
                    },
                },
            },
            // {
            //     title: "Audience",
            //     value: 120,
            //     unit: "V",
            //     options: {
            //         isSwitchable: false,
            //         condition: "<",
            //         conditionValue: 5,
            //         icon: {
            //             on: "mdi-clock",
            //             off: "mdi-account",
            //         },
            //         icon_color: {
            //             on: "blue",
            //             off: "red",
            //         },
            //     },
            // },
            // {
            //     title: "Conversions",
            //     value: false,
            //     options: {
            //         isSwitchable: true,
            //         icon: {
            //             on: "mdi-flag",
            //             off: "mdi-clock",
            //         },
            //         icon_color: {
            //             on: "blue",
            //             off: "red",
            //         },
            //     },
            // },
        ],
    }
    let wrapper: any;
    let vuetify: any;


    it('prop type', () => {
        vuetify = new Vuetify();
        wrapper = mount(Entities, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.vm.item).toMatchObject<entities>(item)
    });
    it('renders', () => {
        vuetify = new Vuetify();
        wrapper = mount(Entities, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('icons are changing acording to button click', () => {
        wrapper = mount(Entities, {
            localVue, vuetify, propsData: { item },
        })
        let currentItem, iteration = wrapper.vm.item.items.length
        for (let i = 0; i < iteration; i++) {
            currentItem = wrapper.vm.item.items[i]
            const icon = wrapper.findAllComponents(({ name: 'v-icon' })).at(i)
            if (currentItem.options.isSwitchable) {
                expect(icon.classes()).toContain(currentItem.value ? currentItem.options.icon.on : currentItem.options.icon.off)
                expect(icon.classes()).toContain(currentItem.value ? `${currentItem.options.icon_color.on}--text` : `${currentItem.options.icon_color.off}--text`)
            }
        }
    })

})