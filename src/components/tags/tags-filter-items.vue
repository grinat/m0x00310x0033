<template>
  <div class="m-tags-filter-items">
    <label
      :class="`checkbox item level-${level}`"
      v-for="item in items"
      :key="item.id"
    >
      <input
        type="checkbox"
        @change="(e) => $emit('change', {nodes: [item], checked: e.target.checked})"
        :checked="value.indexOf(item.id) > -1"
      >
      {{item.name}} {{item.id}}
      <template
        v-if="item.children.length > 0"
      >
        <span
          class="icon"
          @click.stop.prevent="toggleChilds(item)"
        >
          <i
            :class="expandedChildsInItems.indexOf(item.id) > -1 ? 'fas fa-angle-double-up' : 'fas fa-angle-double-down'"
          ></i>
        </span>
        <m-tags-filter-items
          v-if="expandedChildsInItems.indexOf(item.id) > -1"
          :items="item.children"
          :level="level + 1"
          @change="data => $emit('change', data)"
          :value="value"
        ></m-tags-filter-items>
      </template>
    </label>
  </div>
</template>

<script>
  export default {
    name: "m-tags-filter-items",
    props: {
      value: Array,
      items: Array,
      level: {
        type: Number,
        default: 1
      }
    },
    data: () => ({
      expandedChildsInItems: []
    }),
    methods: {
      toggleChilds (item) {
        if (this.expandedChildsInItems.indexOf(item.id) === -1) {
          this.expandedChildsInItems.push(item.id)
        } else {
          this.expandedChildsInItems = this.expandedChildsInItems.filter(id => id !== item.id)
          // on hide, uncheck all childs
          this.$emit('change', {nodes: item.children, checked: false})
        }
      }
    }
  }
</script>

<style lang="scss">
  .m-tags-filter-items{
    .item{
      width: 100%;

      @for $i from 1 through 10 {
        &.level-#{$i} {
          padding-left: #{$i * 10}px;
        }
      }
    }
  }
</style>
