<template>
  <div class="home-filter">
    <p>Cats</p>
    <m-tags-filter
      :tree="collections.categories"
      :value="filterModel.categories"
      @input="(values) => handleInput({filterAttr: 'categories', values})"
    ></m-tags-filter>

    <p>Tags</p>
    <m-tags-filter
      :tree="collections.tags"
      :value="filterModel.tags"
      @input="(values) => handleInput({filterAttr: 'tags', values})"
    ></m-tags-filter>

    <p>Type</p>
    <m-select-with-groups
      :items="collections.types"
      :value="filterModel.type"
      @input="(value) => handleInput({filterAttr: 'type', value})"
    ></m-select-with-groups>
  </div>
</template>

<script>
  import MTagsFilter from "../../components/tags/tags-filter"
  import MSelectWithGroups from "../../components/select/select-with-groups"

  class FilterModel {
    categories = []
    tags = []
    type = ''
  }

  export default {
    name: "home-filter",
    components: {MSelectWithGroups, MTagsFilter},
    data: () => ({
      filterModel: new FilterModel()
    }),
    props: {
      collections: Object
    },
    methods: {
      handleInput ({filterAttr, values, value}) {
        this.filterModel[filterAttr] = values || value
        this.$emit('filter', {filterAttr, values, value})
        this.resetFilterModel(filterAttr)
      },
      resetFilterModel(exceptAttr) {
        for (let attr in this.filterModel) {
          if (attr === exceptAttr) continue
          this.filterModel[attr] = new this.filterModel[attr].constructor
        }
      }
    }
  }
</script>
