<template>
  <section class="home section">
    <div class="container">
      <div class="tile is-ancestor">
        <div class="tile is-parent">
          <article class="tile is-child box">
            <home-filter
              :collections="collections"
              @filter="onFilter"
            ></home-filter>
          </article>
        </div>
        <div class="tile is-parent is-8">
          <article class="tile is-child box">
            <m-table
              :items="dbData.data"
            ></m-table>

            <m-pagination
              :meta="dbData.meta"
              @pageChange="onPageChange"
              @pageCountChange="onPageCountChange"
            ></m-pagination>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import MTable from "../components/table/table"
import HomeFilter from "./components/home-filter"
import MPagination from "../components/pagination/pagination"

import {HOME_COLLECTION, HOME_DATA} from '../store'

class FilterModel {
  perPage
  currentPage
  filterAttr
  values
  value
}

export default {
  name: 'home',
  components: {
    MPagination,
    HomeFilter,
    MTable
  },
  computed: {
    dbData () {
      return this.$store.getters.getDbDataByKey(HOME_DATA)
    },
    collections () {
      return this.$store.getters.getDbDataByKey(HOME_COLLECTION)
    }
  },
  created () {
    this.filterModel = new FilterModel()
    this.fetch()
  },
  methods: {
    onPageChange (page) {
      this.filterModel.currentPage = page
      this.fetch()
    },
    onPageCountChange (count) {
      this.filterModel.perPage = count
      this.fetch()
    },
    onFilter ({filterAttr, values, value}) {
      this.filterModel.filterAttr = filterAttr
      this.filterModel.values = values
      this.filterModel.value = value
      this.filterModel.currentPage = 1
      this.fetch()
    },
    fetch () {
      this.$store.dispatch('filterDbData', {dbName: HOME_DATA, ...this.filterModel})
    }
  }
}
</script>
