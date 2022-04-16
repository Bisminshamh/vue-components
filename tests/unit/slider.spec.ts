import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils';
import Slider from "@/components/slider.vue"
import { slider } from "@/types/index";
import "./setup"
describe('slider.vue', () => {
    const localVue = createLocalVue()
    let item = {
        name: "Kitchen Door",
        status: false,
        range: 50,
        Options: {
            icon: {
                show: true,
                on: "mdi-lock",
                off: "mdi-lock-open",
            },
            icon_color: {
                on: "green",
                off: "red",
            },
        },
    }
    let wrapper: any;
    let vuetify: any;
    it('renders', () => {
        vuetify = new Vuetify();
        wrapper = mount(Slider, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBe(true)
    })
    it('prop type', () => {
        vuetify = new Vuetify();
        wrapper = mount(Slider, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.vm.item).toMatchObject<slider>(item)
    });
    //TODO
    //method and event @input of slider 
})