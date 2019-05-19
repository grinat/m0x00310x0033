import Vue from 'vue'
import Vuex from 'vuex'

import {HomeCollectionFixture, HomeDataFixture} from "../tests/fixtures/home"

Vue.use(Vuex)

export const HOME_DATA = 'home_data'
export const HOME_COLLECTION = 'home_collection'

function createMeta (data, {perPage, currentPage}) {
  const totalCount = data.length
  return {
    totalCount,
    perPage,
    pages: Math.ceil(totalCount / perPage),
    currentPage
  }
}

export default new Vuex.Store({
  state: {
    db: {
      [HOME_DATA]: {
        source: new HomeDataFixture(),
        mutated: null
      },
      [HOME_COLLECTION]: {
        source: new HomeCollectionFixture(),
        mutated: null
      }
    }
  },
  getters: {
    getDbDataByKey: (state) => (key) => {
      return state.db[key].mutated || state.db[key].source
    }
  },
  actions: {
    filterDbData: (ctx, params = {}) => {
      const {dbName, filterAttr, values, value, perPage = 1, currentPage = 1} = params
      const data = {
        data: ctx.state.db[dbName].source.data.slice(),
        meta: {}
      }

      // filter by single value
      if (value) {
        data.data = data.data.filter(model => model[filterAttr] === value)
      }

      // filter by array values
      if (values && values.length) {
        data.data = data.data.filter(model => {
          let hasOneOfValues = false
          for (let i = 0; i < values.length; i++) {
            if (model[filterAttr].indexOf(values[i]) > -1) {
              hasOneOfValues = true
              break
            }
          }
          return hasOneOfValues
        })
      }

      // prepare for pagination
      data.meta = createMeta(data.data, {perPage, currentPage})
      if (currentPage > data.meta.pages) {
        data.meta.currentPage = data.meta.pages
      }
      data.data = data.data.slice((data.meta.currentPage - 1) * data.meta.perPage, data.meta.currentPage * data.meta.perPage)

      ctx.commit('setMutatedDbDataByKey', {dbName, data})
    }
  },
  mutations: {
    setMutatedDbDataByKey: (state, {dbName, data}) => {
      state.db[dbName].mutated = Object.assign({}, data)
    }
  }
})
