// Imports
import HistoryGraph from "@/components/historyGraph.vue";
import { history_graph } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('HistoryGraph.vue', () => {
    const localVue = createLocalVue()
    let item = {
        title: "HistoryGraph",
        data: [
            {
                name: "on",
                data: [
                    {
                        x: "Door Sensor",
                        y: [
                            new Date(1789, 3, 30).getTime(),
                            new Date(1797, 2, 4).getTime(),
                        ],
                    },
                ],
            },
            {
                name: "off",
                data: [
                    {
                        x: "Door Sensor",
                        y: [
                            new Date(1797, 2, 4).getTime(),
                            new Date(1801, 2, 4).getTime(),
                        ],
                    },
                ],
            },
        ],
    }
    let wrapper: any;
    let vuetify: any;

    it('renders', () => {
        vuetify = new Vuetify();
        wrapper = mount(HistoryGraph, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('prop type', () => {
        vuetify = new Vuetify();
        wrapper = mount(HistoryGraph, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.vm.item).toMatchObject<history_graph>(item)
    });
})