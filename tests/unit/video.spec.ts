import Vuetify from 'vuetify'
import { createLocalVue, mount } from '@vue/test-utils';
import Video from "@/components/video.vue"
import { mediaItem } from "@/types/index";
import "./setup"

describe('Video.vue', () => {
    const localVue = createLocalVue()
    let item = {
        id: "1",
        type: 'video',
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

    beforeEach(() => {
        vuetify = new Vuetify();
        wrapper = mount(Video, {
            localVue, vuetify, propsData: { item },
        })
    })
    it('renders', () => {
        expect(wrapper.exists()).toBe(true)
    })
    it('prop type', () => {
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.vm.item).toMatchObject<mediaItem>(item)
    });
    let eventCases = [
        ['volume'],
        ['muted'],
        ['unmuted'],
        ['right'],
        ['left'],
        ['up'],
        ['down'],
        ['reset']
    ]
    it.each(eventCases)('check if event is defined/undefined for `%s`', (eventType) => {
        //call the method which trigger the event
        wrapper.vm.cameraControls({ type: eventType })

        switch (eventType) {
            case "volume":
            case "muted":
            case "unMuted":
                //there is no emit event for these cases so it must be undefined
                expect(wrapper.emitted('cameraControls')).toBeUndefined()
                break;
            default:
                expect(wrapper.emitted('cameraControls')).toHaveLength(1)
                break;
        }
    })
})