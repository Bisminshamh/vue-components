// Imports
import Logbook from "@/components/logbook.vue";
import { logbook } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('Logbook.vue', () => {
    const localVue = createLocalVue()
    let item = {
        name: "Logbook",
        Date: "October 30, 2020",
        items: [
            {
                icon: "mdi-lightbulb",
                status: true,
                title: "Ceiling Light",
                Date: "5:39:36 PM - 14 seconds ago",
            },
            {
                icon: "mdi-lightbulb",
                status: false,
                title: "Fan",
                Date: "5:39:36 PM - 14 seconds ago",
            },
            {
                icon: "mdi-lightbulb",
                status: false,

                title: "Ac",
                Date: "5:39:36 PM - 14 seconds ago",
            },
            {
                icon: "mdi-lightbulb",
                status: false,
                title: "Ac",
                Date: "5:39:36 PM - 14 seconds ago",
            },
            {
                icon: "mdi-lightbulb",
                status: false,
                title: "Ac",
                Date: "5:39:36 PM - 14 seconds ago",
            },
        ]
    }
    let wrapper: any;
    let vuetify: any;

    it('renders', () => {
        vuetify = new Vuetify();
        wrapper = mount(Logbook, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('prop type', () => {
        vuetify = new Vuetify();
        wrapper = mount(Logbook, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.vm.item).toMatchObject<logbook>(item)
    });

})