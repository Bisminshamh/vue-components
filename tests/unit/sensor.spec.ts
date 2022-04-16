import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils';
import Sensor from "@/components/sensor.vue"
import { sensor } from "@/types/index";
import "./setup"

describe('Entity.vue', () => {
    const localVue = createLocalVue()
    let item = {
        entity: {
            title: "Entity Name",
            value: 0.966,
            unit: " %",
            options: {
                icon: true,
            },
        },
        graph: {
            categories: [
                "2019-01-01",
                "2019-02-01",
                "2019-03-01",
                "2019-04-01",
                "2019-05-01",
                "2019-06-01",
                "2019-07-01",
                "2019-08-01",
                "2019-09-01",
            ],
            series: [
                {
                    name: "Entity Name",
                    data: [15, 20, 21, 25, 60, 150, 93, 77, 85],
                },
            ],
        },
    }
    let wrapper: any;
    let vuetify: any;

    it('renders', () => {
        vuetify = new Vuetify();
        wrapper = mount(Sensor, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBe(true)
    })
    it('prop type', () => {
        vuetify = new Vuetify();
        wrapper = mount(Sensor, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.vm.item).toMatchObject<sensor>(item)
    });
})