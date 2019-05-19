import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'

import {HomeCollectionFixture} from "../fixtures/home"

import HomeFilter from '../../src/views/components/home-filter'
import MTagsFilter from "../../src/components/tags/tags-filter"
import MTagsFilterItems from "../../src/components/tags/tags-filter-items"

let wrapper

describe('Filter.vue', () => {
  beforeEach(() => {
    wrapper = shallowMount(HomeFilter, {
      propsData: {
        collections: new HomeCollectionFixture()
      },
      stubs: {
        MTagsFilter,
        MTagsFilterItems
      }
    })
  })

  it('filter doesnt crash, filter show smth', () => {
    expect(wrapper.text()).to.include('Первая категория')
  })
})
