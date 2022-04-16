// Imports
import Media from "@/components/media.vue";
import { mediaItem } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('Media.vue', () => {
    const localVue = createLocalVue()
    let item = {
        id: "1",
        type: "image",
        src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
        title: "camera 1",
        options: {
            PT: true,
            zoom: true,
            mic: true,
            volume: true,
        }
    }
    let wrapper: any;
    let vuetify: any;

    it('renders', () => {
        vuetify = new Vuetify();
        wrapper = mount(Media, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('prop type', () => {
        vuetify = new Vuetify();
        wrapper = mount(Media, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.vm.item).toMatchObject<mediaItem>(item)
    });

    const cases = [
        //[eventType,actionType,index,iconText]
        ['up', 'camera up control', 0, 'mdi-menu-up'],
        ['left', 'camera left control', 1, 'mdi-menu-left'],
        ['zoom-out', 'camera zoom out', 2, 'mdi-minus-circle-outline'],
        ['reset', 'camera zoom restore', 3, 'mdi-restore'],
        ['zoom-in', 'camera zoom in', 4, 'mdi-plus-circle-outline'],
        ['right', 'camera right control', 5, 'mdi-menu-right'],
        ['down', 'camera down control', 6, 'mdi-menu-down'],
        ['unMuted', 'unmute volume', 7, 'mdi-volume-high'],
        ['muted', 'mute volume', 7, 'mdi-volume-off'],
        ['micOn', 'mic on', 8, 'mdi-microphone'],
        ['micOff', 'mic off', 8, 'mdi-microphone-off']
    ];
    it.each(cases)(
        "check whether the method is called and event is emitted with `%s` message when %s button click and icons are shown as per condition",
        async (eventType, actionType, index, iconText) => {
            vuetify = new Vuetify();
            wrapper = mount(Media, {
                localVue, vuetify, propsData: { item },
            })
            //spy the methods
            const emitMethod = jest.spyOn(wrapper.vm, 'controlEvent')
            const event = jest.fn()
            const button = wrapper.findAllComponents(({ name: 'v-btn' })).at(index)
            const icon = wrapper.findAllComponents(({ name: 'v-icon' })).at(index)

            // Here we bind a listener to the wrapper
            // instance to catch our custom event
            wrapper.vm.$on('control', event)

            expect(event).toHaveBeenCalledTimes(0)

            // Simulate a click on the button
            await button.trigger('click')

            //check whether methods called
            expect(emitMethod).toBeCalled()
            if (actionType === 'unmute volume' || actionType === 'mic on') {
                expect(
                    actionType === 'unmute volume' ? wrapper.vm.isMuted : wrapper.vm.isMicOn
                ).toBe(actionType === 'unmute volume' ? false : true)
            }
            if (actionType === 'mute volume' || actionType === 'mic off') {
                // Simulate a click on the button
                await button.trigger('click')

                expect(wrapper.vm.isMuted).toBe(true)
                // check whether methods called
                expect(emitMethod).toBeCalled()

                // Ensure that our mock event was called
                expect(event).toHaveBeenCalledTimes(2)

                //check emitted data
                expect(wrapper.emitted().control[1]).toEqual([{ type: eventType }])
            } else {
                // Ensure that our mock event was called
                expect(event).toHaveBeenCalledTimes(1)

                //check emitted data
                expect(wrapper.emitted().control[0]).toEqual([{ type: eventType }])
            }

            //icons test
            expect(icon.classes()).toContain(iconText)
        }
    )
    const optionCases = [
        {
            name: 'PT',
            expectedInput: {
                PT: true,
                zoom: false,
                mic: false,
                volume: false
            },
            expectedIcons: [
                'mdi-menu-up',
                'mdi-menu-left',
                'mdi-restore',
                'mdi-menu-right',
                'mdi-menu-down',
                'mdi-arrow-expand-all'
            ]
        },
        {
            name: 'zoom',
            expectedInput: {
                PT: false,
                zoom: true,
                mic: false,
                volume: false
            },
            expectedIcons: [
                'mdi-minus-circle-outline',
                'mdi-restore',
                'mdi-plus-circle-outline',
                'mdi-arrow-expand-all'
            ]
        },
        {
            name: 'mic',
            expectedInput: {
                PT: false,
                zoom: false,
                mic: true,
                volume: false
            },
            expectedIcons: [
                'mdi-microphone-off',
                'mdi-arrow-expand-all'
            ]
        },
        {
            name: 'volume',
            expectedInput: {
                PT: false,
                zoom: false,
                mic: false,
                volume: true
            },
            expectedIcons: [
                'mdi-volume-off',
                'mdi-arrow-expand-all'
            ]
        },
    ]
    it.each(optionCases)(
        `check whether the icons are shown for different option cases`,
        ({ expectedInput, expectedIcons }) => {
            vuetify = new Vuetify();
            wrapper = mount(Media, {
                localVue, vuetify, propsData: {
                    item: {
                        id: "1",
                        type: "image",
                        src: "https://cdn.vuetifyjs.com/images/cards/cooking.png",
                        title: "camera 1",
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

    it('fullscreen button test', async () => {
        vuetify = new Vuetify();
        wrapper = mount(Media, {
            localVue, vuetify, propsData: { item },
            attachTo: document.body
        })

        //spy the methods
        const fullscreenMethod = jest.spyOn(wrapper.vm, 'fullscreen')
        const button = wrapper.findAllComponents(({ name: 'v-btn' })).at(9)
        const action = wrapper.findComponent(({ name: 'v-card-actions' }))

        // Simulate a click on the button
        await button.trigger('click')

        // check whether methods called
        expect(fullscreenMethod).toHaveBeenCalledTimes(1)
        expect(fullscreenMethod).toHaveBeenCalledWith('enable');

        wrapper.vm.isFullscreen = true
        await wrapper.vm.$nextTick()

        //checking if the class is present
        expect(action.classes()).toContain('video-controls')

        wrapper.vm.isFullscreen = false
        await wrapper.vm.$nextTick()

        //checking if the class is not present
        expect(action.classes()).not.toContain('video-controls')
    })
})