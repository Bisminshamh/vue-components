import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils';
import Entity from "@/components/entity.vue"
import { entity } from "@/types/index";
import "./setup"

describe('Entity.vue', () => {
    const localVue = createLocalVue()
    let item = {
        title: "Entity Name",
        value: 0.966,
        unit: " %",
        options: {
            icon: true,
        },
    }
    let wrapper: any;
    let vuetify: any;

    it('renders', () => {
        vuetify = new Vuetify();
        wrapper = mount(Entity, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBe(true)
    })
    it('prop type', () => {
        vuetify = new Vuetify();
        wrapper = mount(Entity, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.vm.item).toMatchObject<entity>(item)
    });

    const optionCases = [
        {
            expectedInput: {
                icon: true,
            },
            expectedIcons: [
                'mdi-information'
            ]
        }
    ]
    it.each(optionCases)(
        `check whether the buttons are shown for different option cases`,
        ({ expectedInput, expectedIcons }) => {
            vuetify = new Vuetify();
            wrapper = mount(Entity, {
                localVue, vuetify, propsData: {
                    item: {
                        title: "Entity Name",
                        value: 0.966,
                        unit: " %",
                        options: expectedInput
                    }
                },
            })
            let iterationLength = wrapper.findAllComponents(({ name: 'v-icon' })).length
            for (let i = 0; i < iterationLength; i++) {
                const icon = wrapper.findAllComponents(({ name: 'v-icon' })).at(i)
                expect(icon.classes()).toContain(expectedIcons[i])
            }
        }
    )

})