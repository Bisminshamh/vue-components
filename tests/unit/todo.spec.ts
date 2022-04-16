// Imports
import Todo from "@/components/todo.vue";
import { todo } from "@/types/index";
import "./setup";
// Libraries
import Vuetify from 'vuetify';
//Utilities
import { createLocalVue, mount } from '@vue/test-utils';


describe('Todo.vue', () => {
  const localVue = createLocalVue()
  let item = {
    name: "TODO",
    items: [
      {
        id: 1,
        title: "Go workout",
        status: false,
      },
      {
        id: 2,
        title: "Do laundry",
        status: true,
      }
    ]
  }
  let wrapper: any;
  let vuetify: any;

  it('renders', () => {
    vuetify = new Vuetify();
    wrapper = mount(Todo, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('prop type', () => {
    vuetify = new Vuetify();
    wrapper = mount(Todo, {
      localVue, vuetify, propsData: { item },
    })
    expect(wrapper.vm.item).toMatchObject<todo>(item)
  });
  let iconCases = [
    //iconIndex,expectedIcon,dummyData,testType
    [0, "has", 'mdi-close', "test", 'contain'],
    [1, "has", 'mdi-plus', "test", 'contain'],
    [0, "does not have", 'mdi-close', "", 'notContain'],
    [1, "does not have", 'mdi-plus', "", 'notContain']
  ]
  it.each(iconCases)('icon at index %s %s icon %s while dummy data is `%s`',
    async (iconIndex, testingFor, expectedIcon, dummyData, testType) => {
      console.log(testingFor);
      vuetify = new Vuetify();
      wrapper = mount(Todo, {
        localVue, vuetify, propsData: { item },
      })
      await wrapper.setData({ newTodo: dummyData })
      const icon = wrapper.findAllComponents(({ name: 'v-icon' })).at(iconIndex)
      if (testType === 'contain')
        expect(icon.classes()).toContain(expectedIcon)
      else
        expect(icon.classes()).not.toContain(expectedIcon)

    })

  it('check the text content and it has strike through style if status is true', () => {
    vuetify = new Vuetify();
    wrapper = mount(Todo, {
      localVue, vuetify, propsData: {
        item: {
          name: "TODO",
          items: [
            {
              id: 1,
              title: "Go workout",
              status: false,
            },
            {
              id: 2,
              title: "Do laundry",
              status: true,
            }
          ]
        }
      },
    })
    const style_name = 'text-decoration'
    const style_value = 'line-through'


    for (let i = 0; i < wrapper.vm.item.items.length; i++) {
      const listItemTitle = wrapper.findAllComponents('.v-list-item__title').at(i)

      //check the title
      expect(listItemTitle.text()).toBe(wrapper.vm.item.items[i].title)

      if (wrapper.vm.item.items[i].status)

        //completed todo has `line-through` style
        expect(listItemTitle.element.style[style_name]).toBe(style_value)
      else

        //incompleted todo do not have `line-through` style
        expect(listItemTitle.element.style[style_name]).not.toBe(style_value)
    }
  });
  type eventCasesArray = [string, string, number, number, string, number | undefined | null, undefined | string]
  let eventCases: Array<eventCasesArray> = [
    //element, type, index, noOfParams, param1, param2, param3
    ['v-list-item', 'completed todo', 0, 2, "completed", 1, undefined],
    ['v-list-item', 'incomplete todo', 1, 2, "incompleted", 2, undefined],
    ['v-icon', 'clear all todo', 1, 1, "clear", undefined, undefined],
    ['v-icon', 'addTodo', 1, 3, "addTodo", null, "test"]
  ]

  it.each(eventCases)('click on `%s` for `%s` has called the method  with expected arguments and emited events with expected data',
    async (element, type, index, noOfParams, param1, param2, param3) => {
      vuetify = new Vuetify();
      wrapper = mount(Todo, {
        localVue, vuetify, propsData: { item },
      })
      if (type === 'addTodo')
        await wrapper.setData({ newTodo: param3 })

      //spy methods
      const method = jest.spyOn(wrapper.vm, 'todo')
      const event = jest.fn()

      // Here we bind a listener to the wrapper  instance to catch our custom event
      wrapper.vm.$on('change', event)

      const listItem = wrapper.findAllComponents({ name: element }).at(index)

      //trigger button
      await listItem.trigger('click')

      switch (noOfParams) {
        case 2:
          //`todo` method is called
          expect(method).toBeCalledWith(param1, param2)
          //`change` event is emitted
          expect(event).toHaveBeenLastCalledWith({ type: param1, id: param2, title: param3 })
          break;

        case 1:
          //`todo` method is called
          expect(method).toBeCalledWith(param1)
          //`change` event is emitted
          expect(event).toHaveBeenLastCalledWith({ type: param1 })

          break;
        case 3:
          //`todo` method is called
          expect(method).toBeCalledWith(param1, param2, param3)
          //`change` event is emitted
          expect(event).toHaveBeenLastCalledWith({ type: param1, id: param2, title: param3 })
          break;
      }
    })
})