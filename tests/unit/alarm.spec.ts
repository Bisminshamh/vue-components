// Imports
import Alarm from "@/components/alarm.vue";
import { alarm } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('Alarm.vue', () => {
    const localVue = createLocalVue()
    let item = {
        title: "Alarm",
        armed: true,
        authentication: true,
    }
    let wrapper: any;
    let vuetify: any;

    it('renders', () => {
        vuetify = new Vuetify();
        wrapper = mount(Alarm, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBe(true)
    })

    it('prop type', () => {
        vuetify = new Vuetify();
        wrapper = mount(Alarm, {
            localVue, vuetify, propsData: { item },
        })
        expect(wrapper.exists()).toBeTruthy()
        expect(wrapper.vm.item).toMatchObject<alarm>(item)
    });

    const cases = [
        //[butonIndex,butonValue]
    ];
    //here 1,2,3,4,5,6,7,8,9,11 are the button index for number input
    //creating the array
    for (let i = 1; i < 12; i++) {
        if (i != 10)
            //the value for 11-th button will be 0
            cases.push([i, `${i < 11 ? i : 0}`])
    }
    it.each(cases)(
        "clicked button at index `%s` expected  %s as value",
        async (butonIndex, butonValue) => {
            vuetify = new Vuetify();
            wrapper = mount(Alarm, {
                localVue, vuetify, propsData: { item },
            })
            const button = wrapper.findAllComponents(({ name: 'v-btn' })).at(butonIndex)

            // Simulate a click on the button
            await button.trigger('click')
            expect(wrapper.vm.pin).toEqual(butonValue)

        }
    )
    it('Authentiction is false then total no. of button will be 1 and 0 text-field', () => {
        vuetify = new Vuetify();
        wrapper = mount(Alarm, {
            localVue, vuetify, propsData: {
                item: {
                    title: "Alarm",
                    armed: true,
                    authentication: false,
                }
            },
        })
        //no.of button will be 1
        expect(wrapper.findAllComponents(({ name: 'v-btn' })).length).toEqual(1)
        //no.of text-field will be 0
        expect(wrapper.findAllComponents(({ name: 'v-text-field' })).length).toEqual(0)
    })
    it('check whether backspace clear the value', async () => {
        vuetify = new Vuetify();
        wrapper = mount(Alarm, {
            localVue, vuetify, propsData: { item },
        })
        //set the `pin` data prop to '12345'
        wrapper.setData({ pin: "12345" })
        //index for backspace button is 12
        const button = wrapper.findAllComponents(({ name: 'v-btn' })).at(12)

        //button trigger
        await button.trigger('click')

        //`pin` data prop must contain '1234'
        expect(wrapper.vm.pin).toEqual("1234")

        //triggering button again
        await button.trigger('click')

        //`pin` data prop must contain '123'
        expect(wrapper.vm.pin).toEqual("123")

    })
    it('check whether reset clear the value', async () => {
        vuetify = new Vuetify();
        wrapper = mount(Alarm, {
            localVue, vuetify, propsData: { item },
        })
        //set the `pin` data prop to '12345'
        wrapper.setData({ pin: "12345" })

        //index for backspace button is 10
        const button = wrapper.findAllComponents(({ name: 'v-btn' })).at(10)

        //button trigger
        await button.trigger('click')

        //`pin` data prop must contain ''
        expect(wrapper.vm.pin).toEqual("")

    })

    it('check validation of text field', async () => {
        vuetify = new Vuetify();
        wrapper = mount(Alarm, {
            localVue, vuetify, propsData: { item },
        })
        //setting data to be `empty`
        wrapper.setData({
            pin: '',
        });
        //waiting for the change
        await wrapper.vm.$nextTick()

        //expect validation to be false
        expect(wrapper.vm.$refs.form.validate()).toBeFalsy();

        //setting data to be `123`
        wrapper.setData({
            pin: '123',
        });

        //waiting for the change
        await wrapper.vm.$nextTick()

        //expect validation to be true
        expect(wrapper.vm.$refs.form.validate()).toBeTruthy();
    });
    let Events = [
        //authentication,armed,expectedEventType
        [true, true, "Disarm"],
        [true, false, "Arm"],
        [false, false, "Arm"],
        [false, false, "Arm"]
    ]
    it.each(Events)('Authentication:%s, Armed:%s, Expected Event Type:%s ',
        async (authentication, armed, expectedEventType) => {
            vuetify = new Vuetify();
            wrapper = mount(Alarm, {
                localVue, vuetify, propsData: {
                    item: {
                        title: "Alarm",
                        armed: armed,
                        authentication: authentication,
                    }
                },
            })

            //spy methods
            const emitMethod1 = jest.spyOn(wrapper.vm, 'action')
            const emitMethod2 = jest.spyOn(wrapper.vm, 'pinNumber')
            const event = jest.fn()

            // Here we bind a listener to the wrapper  instance to catch our custom event
            wrapper.vm.$on('change', event)
            //getting component
            const ArmButton = wrapper.findAllComponents(({ name: 'v-btn' })).at(0)

            //trigger button
            await ArmButton.trigger('click')

            //waiting for the change
            await wrapper.vm.$nextTick()

            //check whether `action` method is called
            expect(emitMethod1).toHaveBeenCalledTimes(1)

            if (authentication) {
                //expect validation to be false
                expect(wrapper.vm.$refs.form.validate()).toBeFalsy();

                //`pinNumber` method is not called
                expect(emitMethod2).toHaveBeenCalledTimes(0)

                //setting data to be `12345`
                wrapper.setData({
                    pin: '12345',
                });
                //trigger button
                await ArmButton.trigger('click')

                //waiting for the change
                await wrapper.vm.$nextTick()

                //check whether `action` method is called
                expect(emitMethod1).toHaveBeenCalledTimes(2)

                //expect validation to be true
                expect(wrapper.vm.$refs.form.validate()).toBeTruthy();

                //calling method with value 1
                wrapper.vm.pinNumber(1)

                //waiting for the change
                await wrapper.vm.$nextTick()

                //`pinNumber` method is called
                expect(emitMethod2).toHaveBeenCalledTimes(1)

                //expect the event
                expect(event).toHaveBeenLastCalledWith({ type: expectedEventType, pin: 1 })
            } else {
                expect(wrapper.vm.buttonText).toEqual(expectedEventType)
            }
        });
    const iconCases = [
        //armed,expectedIcon,expectedIconColor
        [true, 'mdi-shield-lock', "error--text"],
        [false, 'mdi-shield-check', "success--text"],
    ]
    it.each(iconCases)('armed:%s, expectedIcon:%s, expectedIconColor:%s',
        async (armed, expectedIcon, expectedIconColor) => {
            vuetify = new Vuetify();
            wrapper = mount(Alarm, {
                localVue, vuetify, propsData: {
                    item: {
                        title: "Alarm",
                        armed: armed,
                        authentication: true,
                    }
                },
            })
            const icon = wrapper.findAllComponents(({ name: 'v-icon' })).at(0)
            //icon check
            expect(icon.classes()).toContain(expectedIcon)
            //icon color check
            expect(icon.classes()).toContain(expectedIconColor)
        });
})