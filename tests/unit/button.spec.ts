import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils';
import Button from "@/components/button.vue"
import { button } from "@/types/index";
import "./setup"
describe('button.vue', () => {
    const localVue = createLocalVue()
    let item = {
        name: "Kitchen Door",
        status: false,
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
        wrapper = mount(Button, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBe(true)
    })
    it('prop type', () => {
        vuetify = new Vuetify();
        wrapper = mount(Button, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.vm.item).toMatchObject<button>(item)
    });
    it('check whether method and event are called at the card click and icon and colors are chnanged accordingly', async () => {
        vuetify = new Vuetify();
        wrapper = mount(Button, {
            localVue, vuetify, propsData: { item },
        })
        //spy the methods
        const emitMethod = jest.spyOn(wrapper.vm, 'change')
        const event = jest.fn()
        const card = wrapper.findAllComponents(({ name: 'v-card' })).at(1)
        // Here we bind a listener to the wrapper
        // instance to catch our custom event
        wrapper.vm.$on('change', event)

        //icon
        const iconBefore = wrapper.findAllComponents(({ name: 'v-icon' })).at(0)
        expect(iconBefore.classes()).toContain(item.Options.icon.off)
        //icon color
        expect(iconBefore.classes()).toContain(`${item.Options.icon_color.off}--text`)

        // Simulate a click on the button
        card.trigger('click')
        await wrapper.vm.$nextTick()
        //check whether methods and event are  called
        expect(emitMethod).toHaveBeenCalledTimes(1)
        expect(event).toHaveBeenCalledTimes(1)

        //setting propdata
        await wrapper.setProps(item.status = true)
        //icon
        const iconAfter = wrapper.findAllComponents(({ name: 'v-icon' })).at(0)
        expect(iconAfter.classes()).toContain(item.Options.icon.on)
        //icon color
        expect(iconAfter.classes()).toContain(`${item.Options.icon_color.on}--text`)
    })
})