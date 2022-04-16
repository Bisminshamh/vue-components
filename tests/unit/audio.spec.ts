// Imports
import Audio from "@/components/audio.vue"
import { audioItem } from "@/types/index";
import "./setup"

// Libraries
import Vuetify from 'vuetify'

//Utilities
import { createLocalVue, mount } from '@vue/test-utils';

describe('Audio.vue', () => {
    const localVue = createLocalVue()
    let item = {
        title: "Audio"
    }
    let callConnected = false;
    let wrapper: any;

    let vuetify: any;
    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = mount(Audio, {
            localVue, vuetify, propsData: { item, callConnected },
        })
    })
    it('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })
    it('prop type', () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.vm.item).toMatchObject<audioItem>(item)
    });

    const cases: Array<[string, string, number, string]> = [
        //[eventType,buttonType,index,iconText]
        ['call-connect', 'call connect', 0, 'mdi-phone'],
        ['muted', 'volume muted', 1, 'mdi-volume-off'],
        ['unmuted', 'volume unmuted', 1, 'mdi-volume-high'],
        ['call-disconnect', 'call disconnect', 2, 'mdi-phone-hangup'],
        ['mic-on', 'mic on', 3, 'mdi-microphone'],
        ['mic-off', 'mic off', 3, 'mdi-microphone-off']
    ];
    it.each(cases)(
        "check whether the method is called and event is emitted with `%s` message when %s button click and icons are shown as per condition",
        async (eventType, buttonType, index, iconText) => {
            expect(wrapper.vm.window).toBe(0)
            //setting the propdata
            await wrapper.setProps({ callConnected: true })

            //Ensure the window property changed via watcher
            expect(wrapper.vm.window).toBe(1)
            await wrapper.vm.$nextTick()

            //spy the methods
            const emitMethod = jest.spyOn(wrapper.vm, 'control')
            const event = jest.fn()
            const button = wrapper.findAllComponents(({ name: 'v-btn' })).at(index)


            // Here we bind a listener to the wrapper
            // instance to catch our custom event
            wrapper.vm.$on('buttonEvent', event)

            expect(event).toHaveBeenCalledTimes(0)

            // Simulate a click on the button
            button.trigger('click')
            await wrapper.vm.$nextTick()

            //check whether methods called
            expect(emitMethod).toBeCalled()
            if (buttonType === 'volume muted' || buttonType === 'mic on') {
                expect(
                    buttonType === 'volume muted' ? wrapper.vm.isMuted : wrapper.vm.isMicOn
                ).toBe(true)
            }
            if (buttonType === 'volume unmuted' || buttonType === 'mic off') {
                // Simulate a click on the button
                button.trigger('click')
                await wrapper.vm.$nextTick()
                expect(wrapper.vm.isMuted).toBe(false)

                //check whether methods called
                expect(emitMethod).toBeCalled()

                // Ensure that our mock event was called
                expect(event).toHaveBeenCalledTimes(2)

                //check emitted data
                expect(wrapper.emitted().buttonEvent[1]).toEqual([{ type: eventType }])


            } else {
                // Ensure that our mock event was called
                expect(event).toHaveBeenCalledTimes(1)

                //check emitted data
                expect(wrapper.emitted().buttonEvent[0]).toEqual([{ type: eventType }])
            }

            //icons test
            const icon = wrapper.findAllComponents(({ name: 'v-icon' })).at(index)
            expect(icon.classes()).toContain(iconText)
        }
    )
})