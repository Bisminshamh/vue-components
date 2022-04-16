// Imports
import Markdown from "@/components/markdown.vue";
import { markdown } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('Markdown.vue', () => {
    const localVue = createLocalVue()
    let item = {
        title: "Title",
        content:
            "The **Markdown** card allows you to write any text. You can style it **bold**, *italicized*, ~strikethrough~ etc. You can do images, links, and more.",
    }
    let wrapper: any;
    let vuetify: any;

    it('renders', () => {
        vuetify = new Vuetify();
        wrapper = mount(Markdown, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('prop type', () => {
        vuetify = new Vuetify();
        wrapper = mount(Markdown, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.vm.item).toMatchObject<markdown>(item)

    });
    it('has <strong> element to bold `Markdown` text', () => {
        vuetify = new Vuetify();
        wrapper = mount(Markdown, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.html()).toContain('<strong>Markdown</strong>')
    });
    it('has <strong> element to bold `bold` text', () => {
        vuetify = new Vuetify();
        wrapper = mount(Markdown, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.html()).toContain('<strong>bold</strong>')
    });
    it('has <em> element to italicize `italicized` text', () => {
        vuetify = new Vuetify();
        wrapper = mount(Markdown, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.html()).toContain('<em>italicized</em>')
    });
    it('has <del> element to strikethrough `strikethrough` text', () => {
        vuetify = new Vuetify();
        wrapper = mount(Markdown, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.html()).toContain('<del>strikethrough</del>')
    });

})