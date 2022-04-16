// Imports
import MusicPlayer from "@/components/musicPlayer.vue";
import { musicPlayer } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('MusicPlayer.vue', () => {
  const localVue = createLocalVue()
  let item = {
    items: [
      {
        title: "Service Bell",
        artist: "Daniel Simion",
        src: "https://soundbible.com/mp3/service-bell_daniel_simion.mp3",
      },
      {
        title: "Meadowlark",
        artist: "Daniel Simion",
        src: "https://soundbible.com/mp3/meadowlark_daniel-simion.mp3",
      },
    ],
  }
  let wrapper: any;
  let vuetify: any;

  it('renders', () => {
    vuetify = new Vuetify();
    wrapper = mount(MusicPlayer, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('prop type', () => {
    vuetify = new Vuetify();
    wrapper = mount(MusicPlayer, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.vm.item).toMatchObject<musicPlayer>(item)
  });
  it('show music list on button click', async () => {
    vuetify = new Vuetify();
    wrapper = mount(MusicPlayer, {
      localVue, vuetify, propsData: { item },
    })
    //expect music list is not shown
    expect(wrapper.vm.list).toBe(false)

    const button = wrapper.findAllComponents({ name: 'v-btn' }).at(0)
    await button.trigger('click')

    //expect music list is shown
    expect(wrapper.vm.list).toBe(true)
    //find list element
    const list = wrapper.findAllComponents({ name: 'v-list' })
    expect(list.length).toBe(1)
  })
  it('close music list on close button click', async () => {
    vuetify = new Vuetify();
    wrapper = mount(MusicPlayer, {
      localVue, vuetify, propsData: { item },
    })
    //setting list data prop as true for showing music list
    await wrapper.setData({ list: true })
    //expect music list is not shown
    expect(wrapper.vm.list).toBe(true)

    const button = wrapper.findAllComponents({ name: 'v-btn' }).at(0)
    await button.trigger('click')

    //expect music list is shown
    expect(wrapper.vm.list).toBe(false)
    //expect zero list element
    const list = wrapper.findAllComponents({ name: 'v-list' })
    expect(list.length).toBe(0)
  })


  const cases: Array<[string, string, number]> = [
    //[ButtonName,methodName,index]
    ['previous', 'previousSong', 1],
    ['pause/play', 'audioControl', 2],
    ['next', 'nextSong', 3],
  ];
  it.each(cases)(
    "`%s` button called the function `%s`",
    async (ButtonName, methodName, index) => {
      vuetify = new Vuetify();
      wrapper = mount(MusicPlayer, {
        localVue, vuetify, propsData: { item },
      })
      console.log(ButtonName);
      if (methodName === 'previousSong')
        await wrapper.setData({ currentSong: 1 })

      //spy the methods
      const emitMethod = jest.spyOn(wrapper.vm, methodName)
      const button = wrapper.findAllComponents(({ name: 'v-btn' })).at(index)

      // Simulate a click on the button
      await button.trigger('click')

      expect(emitMethod).toBeCalled()
    }
  )
  it('click on v-list item triggered expected method with expected argument', async () => {
    vuetify = new Vuetify();
    wrapper = mount(MusicPlayer, {
      localVue, vuetify, propsData: { item },
    })
    const emitMethod = jest.spyOn(wrapper.vm, 'changeSong')

    //setting list data prop as true for showing music list
    await wrapper.setData({ list: true })
    //expect music list is shown
    expect(wrapper.vm.list).toBe(true)
    const list = wrapper.findAllComponents({ name: 'v-list-item' }).at(0)
    // Simulate a click on the button
    await list.trigger('click')
    //expect metod is called
    expect(emitMethod).toHaveBeenCalledWith(wrapper.vm.item.items[0], 0)
  })
})